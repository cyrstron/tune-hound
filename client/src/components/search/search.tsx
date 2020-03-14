import React, { Component } from 'react';
import {SearchResults} from './components/search-results';
import {SearchForm} from './components/search-form';
import { Pagination } from '../pagination';

export interface SearchProps {
  totalPages?: number;
  pageIndex: number;
  setPage: (pageIndex: number) => void;
  isPending: boolean;
  error?: Error;
}

export class SearchComponent extends Component<SearchProps> {
  render() {
    const {
      pageIndex, 
      totalPages,
      isPending,
      setPage,
      error
    } = this.props;

    return (
      <div>
        <SearchForm />
        <SearchResults />
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