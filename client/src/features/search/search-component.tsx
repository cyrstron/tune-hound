import React, { FC, useCallback } from 'react';
import classNames from 'classnames/bind';
import { SearchResults } from './components/search-results';
import { SearchForm } from './components/search-form';
import { Pagination } from '../../components/pagination';

import styles from './search.scss';
import { useSelector } from 'react-redux';
import { selectIsSpotifyConnected } from '../../state/spotify';
import { selectDeezerIsConnected } from '../../state/deezer';
import { useDispatcher } from '../../hooks';
import {
  selectIsSearchPending,
  selectPageIndex,
  selectSearchError,
  selectTotalPages,
} from './state/selectors';
import { executeSearchByPageIndex } from './state';

const cx = classNames.bind(styles);

export interface SearchProps {
  className?: string;
}

export const SearchComponent: FC<SearchProps> = ({ className }) => {
  const totalPages = useSelector(selectTotalPages);
  const pageIndex = useSelector(selectPageIndex);
  const error = useSelector(selectSearchError);
  const isPending = useSelector(selectIsSearchPending);
  const isSpotifyConnected = useSelector(selectIsSpotifyConnected);
  const isDeezerConnected = useSelector(selectDeezerIsConnected);
  const dispatcher = useDispatcher();

  const setPage = useCallback(
    (index: number) => {
      dispatcher(executeSearchByPageIndex, index);
    },
    [dispatcher],
  );

  if (!isDeezerConnected && !isSpotifyConnected) return null;

  return (
    <div className={cx('search', className)}>
      <SearchForm />
      <SearchResults className={cx('results')} />
      <div>
        <Pagination
          isDisabled={isPending || !!error}
          pageIndex={pageIndex}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    </div>
  );
};
