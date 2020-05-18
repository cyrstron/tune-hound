import React, {FC} from 'react';
import classNames from 'classnames/bind';
import {PageItem} from './components/page-item';

import styles from './pagination.scss';
import {computePages} from './services';

const cx = classNames.bind(styles);

export interface PaginationProps {
  pageIndex: number;
  totalPages: number;
  pagesLength?: number;
  isDisabled?: boolean;
  setPage: (page: number) => void;
}

const PaginationComponent: FC<PaginationProps> = ({
  pageIndex,
  totalPages,
  pagesLength = 3,
  setPage,
  isDisabled,
}) => {
  const pagesIndexes = computePages(pageIndex, totalPages, pagesLength);

  return (
    <ul className={cx('pages-list')}>
      {pagesIndexes[0] !== 0 && (
        <>
          <PageItem
            pageIndex={0}
            setPage={setPage}
            isActive={pageIndex === 0}
            isDisabled={isDisabled}
          />
          {' ... '}
        </>
      )}
      {pagesIndexes.map((index) => (
        <PageItem
          key={index}
          pageIndex={index}
          setPage={setPage}
          isActive={pageIndex === index}
          isDisabled={isDisabled}
        />
      ))}
      {pagesIndexes[pagesIndexes.length - 1] !== totalPages - 1 && (
        <>
          {' ... '}
          <PageItem
            pageIndex={totalPages - 1}
            setPage={setPage}
            isActive={pageIndex === totalPages - 1}
            isDisabled={isDisabled}
          />
        </>
      )}
    </ul>
  );
};

export {PaginationComponent};
