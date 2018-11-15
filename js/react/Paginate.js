// @flow
import React from 'react'
import ReactPaginate from 'react-paginate'
import './Paginate.css'

type props = {
  classes: Object,
  onPageChange: number, // 페이지 변경
  initialPage: number, // 초기 페이지
  pageCount: number, // 전체 페이지 수
  disableInitialCallback: boolean,
}

/**
 * 페이지네이션 컴포넌트
 * https://github.com/AdeleD/react-paginate
 */
function Paginate({
  onPageChange,
  initialPage,
  pageCount,
  disableInitialCallback = false,
}: props) {
  return (
    <ReactPaginate
      initialPage={initialPage}
      pageCount={pageCount}
      onPageChange={onPageChange}
      disableInitialCallback={disableInitialCallback}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      containerClassName={'PaginateContainer'}
      pageClassName={'PaginatePage'}
      pageLinkClassName={'PaginatePageLink'}
      previousLinkClassName={'PaginatePreviousLink'}
      nextLinkClassName={'PaginateNextLink'}
      activeClassName={'PaginateActive'}
      breakClassName={'PaginateBreak'}
    />
  )
}

export default Paginate
