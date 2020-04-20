import React, {FC} from 'react';
import classNames from 'classnames/bind';

import styles from './album-tile.scss';

const cx = classNames.bind(styles);

export interface AlbumTileProps {
  coverUrl: string;
  title: string;
  year?: number;
  className?: string;
}

const AlbumTileComponent: FC<AlbumTileProps> = ({
  coverUrl,
  title,
  year,
  className,
}) => {
  return (
    <div className={cx('album', className)}>
      <img src={coverUrl} className={cx('cover')}/>
      <div className={cx('title')} title={title}>{title}</div>
      <div>Year: {year}</div>
    </div>
  );
}

export {AlbumTileComponent}