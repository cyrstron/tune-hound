import React, { Component } from 'react';
import classNames from 'classnames/bind';
import {SearchResults} from './components/search-results';
import {SearchForm} from './components/search-form';
import { Pagination } from '../pagination';

import styles from './search.scss';

const cx = classNames.bind(styles);

export interface SearchProps {
  className?: string;
  totalPages?: number;
  pageIndex: number;
  setPage: (pageIndex: number) => void;
  isPending: boolean;
  error?: Error;
}

export class SearchComponent extends Component<SearchProps> {
  render() {
    const {
      className,
      pageIndex, 
      totalPages,
      isPending,
      setPage,
      error
    } = this.props;

    return (
      <div className={cx('search', className)}>
        <SearchForm />
        <SearchResults className={cx('results')} />
        <div>
          {totalPages && (
            <Pagination 
              isDisabled={isPending || !!error}
              pageIndex={pageIndex} 
              totalPages={totalPages} 
              setPage={setPage} 
            />
          )}
        </div>
      </div>
    );
  }
}