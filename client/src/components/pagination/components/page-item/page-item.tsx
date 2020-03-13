import React, {FC, useCallback} from 'react';
import classNames from 'classnames/bind';

import styles from './page-item.scss';

const cx = classNames.bind(styles);

export interface PageItemProps {
  pageIndex: number;
  isActive?: boolean;
  setPage: (page: number) => void;
}

const PageItemComponent: FC<PageItemProps> = ({
  pageIndex,
  isActive,
  setPage,
  children,
}) => {
  const onClick = useCallback(() => {
    setPage(pageIndex);
  }, [setPage, pageIndex]);

  return (
    <li className={cx('page', {
      'active': isActive,
    })}>
      <button onClick={onClick} className={cx('page-button')}>
        {children || pageIndex + 1}
      </button>
    </li>
  );
}

export {PageItemComponent}
