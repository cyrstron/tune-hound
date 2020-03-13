import React, { Component } from 'react';
import { SearchResult } from '@app/state/search/types';
import { SearchedTrack } from './components/searched-track';
import { Pagination } from '../pagination';

export interface SearchResultsProps {
  totalPages?: number;
  pageIndex: number;
  setPage: (pageIndex: number) => void;
  currentPage?: SearchResult[];
  isPending: boolean;
  error?: Error;
}

export class SearchResultsComponent extends Component<SearchResultsProps> {
  render() {
    const {
      currentPage, 
      pageIndex, 
      totalPages,
      isPending,
      setPage,
      error
    } = this.props;

    if (isPending) return (
      <div>Loading...</div>
    )

    if (error) return (
      <div>{error.message}</div>
    )

    if (!currentPage) return null;

    if (currentPage.length === 0) return (
      <div>Nothing found</div>
    );

    return (
      <div>
        <ul>
        {currentPage.map((item, index) => {
          if (item.type === 'track') {
            return (
              <SearchedTrack key={index} track={item}/>
            )
          }
        })}
        </ul>
        <div>
          {totalPages && (
            <Pagination 
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