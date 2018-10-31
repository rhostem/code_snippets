import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpUtilService } from './http-util.service';
import R from 'ramda';
declare var moment;
const parseDecimal = R.unary(parseInt); // 10진수 변환
import { Subscription } from 'rxjs/Subscription';
import { deleteALLvalue } from '../../utils/objHelper';

/**
 * 페이지네이션이 포함된 컴포넌트에서 상속할 클래스.
 * 페이지 새로고침, 페이지 버튼 콜백 등이 포함된다.
 * 페이지당 표시 수, limit는 기본 10으로 한다.
 *
 * 검색 조건 유지를 위해 refreshList 메소드는 쿼리스트링을 업데이트한 후 라우트를 변경하는 방법을 사용한다.
 * 대신 실제로 목록이 업데이트되기 위해서는 listenRouteQueryStream 메소드의 인자로 전달되는 onNext
 * 함수에 목록을 새로 가져오는 로직을 작성해야 한다.
 *
 * @export
 * @class ListBase
 */
@Injectable()
export class ListBase {
  queryParams: any; // 쿼리스트링 객체.
  queryParamSubject = new Subject(); // route.queryParams에 병합해서 사용한다.
  querySubscription: Subscription;

  defaultQueryParams: any; // 기본 쿼리스트링 객체. 상속받은 클래스에서 할당한다.
  defaultPageQuery =  { skip: 0, limit: 10 }; // 페이지 기본 쿼리
  defaultDateQuery = { // 날짜 기본 쿼리. 현재 날짜로부터 1달 전
    start: moment().subtract(1, 'months').add(1, 'days').format('YYYY-MM-DD'),
    end: moment().format('YYYY-MM-DD'),
  };
  defaultEntireDateQuery = { // 전체기간 기본 쿼리. date-range-picker 참조
    startDate: moment('2015-01-01').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  };
  listItems: Array<any>; // 현재 페이지 아이템 객체
  totalCount = 0; // 전체 아이템 수
  _currentPage = 1;

  /**
   * 현재 페이지
   * ng2-bootstrap 페이지네이션 컴포넌트의 ngModel에 할당할 속성
   * http://valor-software.com/ngx-bootstrap/#/pagination
   */
  get currentPage() {
    const skip = Number(this.queryParams.skip);
    const limit = Number(this.queryParams.limit);

    if (!isNaN(skip) && !isNaN(limit)) {
      this._currentPage = (skip + limit) / limit;
    }

    return this._currentPage;
  }

  set currentPage(page) {
    this._currentPage = page;
  }

  /**
   * 날짜 범위 선택 버튼 텍스트
   */
  get dateRangeText(): string {
    const start = moment(this.queryParams.start).format('YYYY-MM-DD');
    const end = moment(this.queryParams.end).format('YYYY-MM-DD');
    return `${start} ~ ${end}`;
  }

  /**
   * 리스트 페이지네이션 상태 텍스트
   * ex) 10개의 결과 중 1 ~ 10
   * @returns {string}
   */
  get pageStatusText(): string {
    const skip = parseDecimal(this.queryParams.skip) || 0;
    const limit = parseDecimal(this.queryParams.lmit) || 10;
    return `${this.totalCount}개의 결과 중 ${skip + 1} ~ ${skip + limit}`;
  }

  /**
   * 리스트 아이템이 있는지 여부
   *
   * @readonly
   * @type {boolean}
   * @memberOf ListBase
   */
  get isNoListItems(): Boolean {
    return this.listItems && this.listItems.length === 0;
  }

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public httpUtilService: HttpUtilService,
  ) {
  }

  /**
   * 라우트 쿼리스트링 객체 observable을 subscribe한다.
   * subject를 merge해서 라우트 변경 없이도 스트림을 발생시킬 수 있게 한다.
   *
   * @param {any} onNext Observable.subscribe 콜백 함수
   *
   * @memberOf ListBase
   */
  listenRouteQueryStream(onNext) {
    this.querySubscription = this.activatedRoute.queryParams
      .merge(this.queryParamSubject)
      .subscribe(onNext);
  }

  /**
   * 목록 새로고침. 쿼리스트링 객체를 전달받아서 현재 페이지로 쿼리를 붙여 이동한다.
   * @param params
   */
  refreshByNav(params) {
    const queryParams = R.pipe(
      R.partial(Object.assign, [{}]),
      this.httpUtilService.trimQueryParams,
    )(params);

    this.router.navigate(['./'], {
      queryParams,
      relativeTo: this.activatedRoute,
    });
  }

  /**
   * 목록 새로고침. 쿼리스트링 객체에 skip, limit의 기본값을 적용해서 첫번째 페이지로 이동한다.
   */
  refreshToFirstPage(params) {
    console.log(this, params);

    this.queryParams = Object.assign({}, params, this.defaultPageQuery);
    this.refreshByNav(this.queryParams);
  }

  /**
   * 목록 새로고침. subject를 이용한다.
   * 쿼리스트링이 변경되지 않는 경우 페이지를 이동하지 않고 목록을 다시 불러올 수 있다.
   */
  refreshWithoutNav(params?) {
    this.queryParamSubject.next(params || this.queryParams);
  }

  /**
   * ng2-bootstrap 페이지네이션 컴포넌트의 페이지 버튼 클릭 콜백
   * http://valor-software.com/ngx-bootstrap/#/pagination
   *
   * @param queryParams
   * @param option
   */
  onChangePage(option = { page: 1, itemsPerPage: 10 }) {
    const limit = parseDecimal(option.itemsPerPage);

    this.queryParams = Object.assign({}, this.queryParams, {
      skip: (option.page - 1) * limit,
      limit: limit
    });

    this.refreshByNav(this.queryParams);
  }

  /**
   * appDateRangePicker directive의 콜백 함수
   */
  onSelectDateRange(e) {
    this.queryParams = Object.assign({}, this.queryParams, {
      start: e.start,
      end: e.end,
    });
    this.refreshToFirstPage(this.queryParams);
  }

  /**
   * 리스트 정렬 조건 토글
   * @param parameter 정렬에 사용할 파라미터
   */
  onToggleSort(sort: string) {
    this.queryParams.sort = this.toggleSortParameter(this.queryParams.sort, sort);
    this.refreshByNav(this.queryParams);
  }

  /**
   * 정렬 파라미터 값을 토글한다.
   * 현재 정렬 파라미터가 같은 키라면 '-' 문자가 있는지 확인한다.
   *
   * @param currentSort 현재 정렬 파라미터에 지정된 값
   * @param nextSort 정렬에 사용할 필트
   */
  toggleSortParameter(currentSort = '', nextSort: string) {
    if (currentSort.includes(nextSort)) {
      return currentSort.includes('-') ? `${nextSort}` : `-${nextSort}`;
    }

    return nextSort;
  }

  /**
   * 테이블 헤드에 사용할 클래스를 지정한다.
   *
   * @param sort 현재 정렬 파라미터에 지정된 값
   * @param parameter 정렬에 사용할 필드
   */
  getSortClass(sort: string, parameter: string) {
    if (sort === parameter) {
      return 'sortAsc';
    }
    if (sort === `-${parameter}`) {
      return 'sortDesc';
    }
    return null;
  }

  /**
   * Object.assign으로 queryParams에 객체를 덮어쓴다.
   *
   * @param {object} obj
   * @returns this.queryParams
   * @memberof CpaListComponent
   */
  assignQueryParams(params = {}) {
    this.queryParams = Object.assign({}, this.queryParams, params);
    return this.queryParams;
  }

  /**
   * queryParams에 옵션 객체를 덮어쓰고 첫번째 페이지로 이동한다.
   *
   * @param {any} params
   * @returns
   * @memberof ListBase
   */
  assignQueryAndRefresh(params) {
    return R.pipe(
      this.assignQueryParams.bind(this),
      this.refreshToFirstPage.bind(this),
    )(params);
  }

  /**
   * assignQueryAndRefresh와 동일한 기능이지만 params 객체에서 값이 ALL인 키는 제거하는 과정을 추가.
   *
   * @param {any} params
   * @returns
   * @memberof ListBase
   */
  assignQueryWithoutALLAndRefresh(params) {
    return R.pipe(
      this.assignQueryParams.bind(this),
      deleteALLvalue,
      this.refreshToFirstPage.bind(this),
    )(params);
  }

  /**
   * queryParams를 초기화하고 첫번째 페이지로 이동
   *
   * @memberof ListBase
   */
  resetQueryAndRefresh() {
    this.queryParams = Object.assign({}, this.defaultQueryParams);
    this.refreshToFirstPage(this.queryParams);
  };
}
