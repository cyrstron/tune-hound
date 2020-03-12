import React, {FC} from 'react';
import classNames from 'classnames/bind';
import {PageItem} from './components/page-item';

import styles from './pagination.scss';

const cx = classNames.bind(styles);

export interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const PaginationComponent: FC<PaginationProps> = ({
  page,
  totalPages,
  setPage,
}) => {
  return (
    <ul className={cx('pages-list')}>

    </ul>
  );
}

export {PaginationComponent};
