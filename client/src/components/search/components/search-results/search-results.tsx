import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { SearchResult } from '@app/state/search/types';
import { SearchedItem } from './components/searched-item';

import styles from './search-results.scss';

const cx = classNames.bind(styles);

export interface SearchResultsProps {
  className?: string;
  currentPage?: SearchResult[];
  isPending: boolean;
  error?: Error;
}

export class SearchResultsComponent extends Component<SearchResultsProps> {
  render() {
    const {
      className,
      currentPage,
      isPending,
      error
    } = this.props;

    return (
      <div className={cx('results', className, {
        pending: isPending,
      })}>
        {error && (
          <div>{error.message}</div>
        )}
        {!error && currentPage?.length === 0 && (
          <div>Nothing found</div>
        )}
        {!error && currentPage && currentPage.length > 0 && (
          <ul className={cx('results-list')}>
            {currentPage.map((item, index) => (
              <SearchedItem key={item.id} item={item} />
            ))}
          </ul>
        )}
      </div>        
    );
  }
}