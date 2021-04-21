import React, { FC } from 'react';
import classNames from 'classnames/bind';
import { SearchResults } from './components/search-results';
import { SearchForm } from './components/search-form';
import { Pagination } from '../../components/pagination';

import styles from './search.scss';
import { useSelector } from 'react-redux';
import {
  selectIsSearchPending,
  selectPageIndex,
  selectSearchError,
  selectTotalPages,
} from './search/selectors';
import { selectIsSpotifyConnected } from '../../state/spotify';
import { selectDeezerIsConnected } from '../../state/deezer';
import { useDispatcher } from '../../hooks';
import { executeSearchByPageIndex } from './search';

const cx = classNames.bind(styles);

export interface SearchProps {
  className?: string;
}

export const Search: FC<SearchProps> = ({ className }) => {
  const totalPages = useSelector(selectTotalPages);
  const pageIndex = useSelector(selectPageIndex);
  const error = useSelector(selectSearchError);
  const isPending = useSelector(selectIsSearchPending);
  const isSpotifyConnected = useSelector(selectIsSpotifyConnected);
  const isDeezerConnected = useSelector(selectDeezerIsConnected);

  const setPage = useDispatcher(executeSearchByPageIndex);

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
