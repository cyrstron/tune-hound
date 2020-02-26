import React, { Component } from 'react';
import { SearchResult } from '@app/state/search/types';

export interface SearchResultsProps {
  totalPages?: number;
  pageIndex: number;
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
        {currentPage.map(({deezer}) => deezer && deezer.type === 'track' && (
          <li key={deezer.id}>
            "{deezer.title}" by <strong>{deezer.artist.name}</strong> from "{deezer.album.title}"
          </li>
        ))}
        </ul>
        <div>
          Page {pageIndex + 1} of {totalPages}
        </div>
      </div>
    );
  }
}