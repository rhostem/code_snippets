import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class LoadingSpinnerService {
  private loading = false; // 로딩 상태
  loadingStream = new Subject();

  get isLoading() {
    return this.loading;
  }

  set isLoading(state: boolean) {
    this.loading = state;
    this.loadingStream.next(state);
  }

  constructor() {
  }

  start() {
    this.isLoading = true;
  }

  stop() {
    this.isLoading = false;
  }

  /**
   * 래핑한 함수를 실행하기 전 spinner를 멈춘다.
   *
   * @param {any} fn 래핑할 함수 ex) res => res.json()
   * @returns
   *
   * @memberOf LoadingSpinnerService
   */
  withStop(fn) {
    const service = this;

    return function(...args) {
      service.stop();
      return fn.apply(this, args);
      // 현재 this는 withStop을 실행한 메소드를 소유한 컨텍스트.
      // 특정 컨텍스트를 전달하고 싶다면 this를 bind해서 전달한다.
      // ex) spinner.withStop(fn.bind(this));
    };
  }
}
