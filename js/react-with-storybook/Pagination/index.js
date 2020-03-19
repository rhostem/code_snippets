import React, { Component } from 'react';
import ReactJsPagination from 'react-js-pagination';
import css from './Pagination.module.scss';
import { number, func, object } from 'prop-types';
import { devLog } from 'lib/devLog';

export default class Pagination extends Component {
  static propTypes = {
    onChangePage: func.isRequired,
    initialPage: number,
    itemsCountPerPage: number,
    totalItemsCount: number.isRequired,
    wrapperStyle: object,
  };

  static defaultProps = {
    initialPage: 1,
    itemsCountPerPage: 10,
    pageRangeDisplayed: 10,
    wrapperStyle: {},
  };

  handlePageChange = pageNumber => {
    devLog(`active page is ${pageNumber}`);
    this.props.onChangePage(pageNumber);
  };

  render() {
    const {
      itemsCountPerPage,
      totalItemsCount,
      pageRangeDisplayed,
      wrapperStyle,
    } = this.props;

    return (
      <div style={wrapperStyle}>
        <ReactJsPagination
          activePage={this.props.initialPage}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={Math.max(itemsCountPerPage, totalItemsCount)} // 최소 1페이지는 보이게
          pageRangeDisplayed={itemsCountPerPage || pageRangeDisplayed}
          onChange={this.handlePageChange}
          innerClass={css.wrap}
          itemClass={css.item}
          activeClass={`${css.isSelected}`}
          itemClassFirst={`${css.toFirst}`}
          itemClassPrev={`${css.toPrev}`}
          itemClassNext={`${css.toNext}`}
          itemClassLast={`${css.toLast}`}
          linkClassFirst={css.anchor__toFirst}
          prevPageText={''}
          firstPageText={''}
          lastPageText={''}
          nextPageText={''}
        />
      </div>
    );
  }
}
