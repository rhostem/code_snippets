import React, { useState, useEffect, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import leftOutlined from '@iconify-icons/ant-design/left-outlined';
import rightOutlined from '@iconify-icons/ant-design/right-outlined';
import Select from './form/Select';

export interface PaginationOnchangeOption {
  page: number;
  pageSize: number;
}

export interface Props {
  initialPage?: number; // 페이지 초기값
  initialPageSize?: number; // 페이지 사이즈 초기값.
  onChange: (option: PaginationOnchangeOption) => void; // 페이지 변경 콜백
  lastPage: number; // 마지막 페이지. 없는 케이스도 있음
  isButtonDisabled?: boolean; // API 호출중이면 버튼 클릭이 비활성화시키는 방식 등으로 사용 가능
  pageSizeUnit?: number; // 페이지 사이즈 옵션 단위
  navigation?: 'dynamic' | 'static'; // 페이지 번호 표시 스타일
  classes?: {
    root?: string;
  };
}

enum NavDirection {
  PREV,
  NEXT,
}

export const DEFAULT_PAGE_SIZE = 10;

const Pagination: React.FC<Props> = ({
  initialPage = 1,
  initialPageSize = DEFAULT_PAGE_SIZE,
  onChange,
  lastPage,
  isButtonDisabled = false,
  pageSizeUnit = 10,
  classes = {},
  navigation = 'dynamic',
}) => {
  const [page, setPage] = useState<number>(
    !isNaN(initialPage) ? initialPage : 1,
  );
  const [pageSize, setPageSize] = useState<number>(
    !isNaN(initialPageSize) ? initialPageSize : DEFAULT_PAGE_SIZE,
  );
  const PAGE_SET_SIZE = 10; // 선택 가능한 페이지 숫자의 수. 한번에 10개씩만 표시한다.

  useEffect(() => {
    if (!isNaN(initialPage)) {
      setPage(initialPage);
    } else {
      setPage(1);
    }
  }, [initialPage]);

  useEffect(() => {
    if (!isNaN(initialPageSize)) {
      setPageSize(initialPageSize);
    } else {
      setPageSize(10);
    }
  }, [initialPageSize]);

  const pageSizeSelectOptions = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => ({
      value: pageSizeUnit * (index + 1),
    }));
  }, [pageSizeUnit]);

  useEffect(() => {
    if (pageSizeSelectOptions.map((v) => v.value).includes(initialPageSize)) {
      setPageSize(initialPageSize);
    } else {
      setPageSize(DEFAULT_PAGE_SIZE);
    }
  }, [initialPageSize, pageSizeSelectOptions]);

  /**
   * currentPage를 기반으로 페이지 세트 인덱스를 계산. 0부터 시작한다.
   * ex) pageSetIndex가 0이라면 1~10페이지까지 표시.
   */
  const pageSetIndex = useMemo(() => {
    return Math.max(0, Math.ceil(page / PAGE_SET_SIZE) - 1);
  }, [page]);

  /**
   * 화면에 표시할 페이지 번호들
   */
  const pageNumbers = useMemo(
    () =>
      Array.from(
        { length: PAGE_SET_SIZE },
        (_, index) => pageSetIndex * PAGE_SET_SIZE + index + 1,
      ).filter((num) => num <= lastPage),
    [lastPage, pageSetIndex],
  );

  /**
   * 현재 페이지가 중앙에 가도록 페이지 번호들을 나열한다.
   */
  const dynamicPageNumbers = useMemo(() => {
    const sideLength = Math.floor(PAGE_SET_SIZE / 2);
    const startNumber = Math.max(1, page - sideLength);

    const numbers = Array.from(
      { length: PAGE_SET_SIZE },
      (_, index) => startNumber + index,
    ).filter((num) => num <= lastPage);

    return numbers;
  }, [lastPage, page]);

  const isPrevArrowVisible = useMemo(() => {
    return lastPage > 0;
  }, [lastPage]);

  // 현재 페이지 세트가 마지막 페이지를 포함하는지
  const isNextArrowVisible = useMemo<boolean>(
    () => lastPage > pageNumbers[pageNumbers.length - 1],
    [lastPage, pageNumbers],
  );

  /**
   * 페이지사이즈 변경. 첫번째 페이지로 이동한다.
   */
  const handleChangePageSize = useCallback(
    (value: any) => {
      setPage(1);
      setPageSize(parseInt(value));
      onChange({
        page: 1,
        pageSize: parseInt(value),
      });
    },
    [onChange],
  );

  const handleChange = useCallback(
    (changePage: number) => {
      setPage(changePage);
      onChange({ page: changePage, pageSize });
    },
    [onChange, pageSize],
  );

  /**
   * 좌우의 페이지 세트 넘기기 버튼 클릭 콜백
   */
  const handleNaviagetePageset = useCallback(
    (direction: NavDirection) => {
      const nextPage =
        Math.max(0, pageSetIndex + (direction === NavDirection.PREV ? -1 : 1)) *
          PAGE_SET_SIZE +
        1;
      setPage(nextPage);
      onChange({ page: nextPage, pageSize });
    },
    [pageSetIndex, onChange, pageSize],
  );

  const buttonClassName =
    'p-xs text-center border-r border-gray-lightest last:border-0 focus:outline-none';

  return lastPage > 0 ? (
    <div className={clsx('flex', classes.root)}>
      <Select
        value={pageSize}
        options={pageSizeSelectOptions}
        onChange={handleChangePageSize}
        classes={{
          root: 'mr',
          select: 'border-gray-lightest',
        }}
      />
      <div
        className={clsx(
          'inline-flex rounded border border-gray-lightest overflow-hidden bg-white',
        )}
      >
        {isPrevArrowVisible && (
          <button
            className={clsx(buttonClassName)}
            onClick={() => handleNaviagetePageset(NavDirection.PREV)}
            disabled={pageSetIndex === 0 || isButtonDisabled}
          >
            <Icon icon={leftOutlined} />
          </button>
        )}
        {(navigation === 'dynamic' ? dynamicPageNumbers : pageNumbers).map(
          // 페이지 세트에는 무조건 10개의 숫자가 들어가므로, 마지막 페이지보다 큰 페이지 번호는 표시하지 않도록 한다
          (pageNumber: number) => (
            <button
              className={clsx(
                buttonClassName,
                pageNumber === page
                  ? 'font-bold bg-primary hover:bg-primary-dark text-white'
                  : 'bg-white',
              )}
              style={{
                minWidth: '2.5em',
              }}
              key={pageNumber}
              onClick={() => handleChange(pageNumber)}
              disabled={isButtonDisabled}
            >
              {pageNumber}
            </button>
          ),
        )}
        {isNextArrowVisible && (
          <button
            className={clsx(buttonClassName)}
            onClick={() => handleNaviagetePageset(NavDirection.NEXT)}
            disabled={!lastPage || isButtonDisabled}
          >
            <Icon icon={rightOutlined} />
          </button>
        )}
      </div>
    </div>
  ) : null;
};

export default Pagination;
