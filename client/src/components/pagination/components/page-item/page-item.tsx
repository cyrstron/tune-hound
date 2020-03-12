import React, {FC} from 'react';
import classNames from 'classnames/bind';

import styles from './page-item.scss';

const cx = classNames.bind(styles);

export interface PageItemProps {
  page: number;
  isSelected?: boolean;
  setPage: (page: number) => void;
}

const PageItemComponent: FC<PageItemProps> = ({
  page,
  isSelected,
  setPage,
}) => {
  return (
    <li className={cx('page', {
      'selected': isSelected,
    })}>
      <button className={cx('page-button')}>
        {page}
      </button>
    </li>
  );
}

export {PageItemComponent}
