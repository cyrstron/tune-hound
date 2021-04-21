import React, { FC } from 'react';
import classNames from 'classnames/bind';
import { SearchedItem } from './components/searched-item';

import styles from './search-results.scss';
import { useSelector } from 'react-redux';
import { selectIsSearchPending, selectResultsPage, selectSearchError } from '../../state/selectors';

const cx = classNames.bind(styles);

export interface SearchResultsProps {
  className?: string;
}

const SearchResults: FC<SearchResultsProps> = ({ className }) => {
  const currentPage = useSelector(selectResultsPage);
  const error = useSelector(selectSearchError);
  const isPending = useSelector(selectIsSearchPending);

  return (
    <div
      className={cx('results', className, {
        pending: isPending,
      })}
    >
      {error && <div>{error.message}</div>}
      {!error && currentPage?.length === 0 && <div>Nothing found</div>}
      {!error && currentPage && currentPage.length > 0 && (
        <ul className={cx('results-list')}>
          {currentPage.map(item => (
            <SearchedItem key={item.id} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
};

export { SearchResults };
