import React, { FC } from 'react';
import classNames from 'classnames/bind';
import { DeezerAlbum } from '@app/state/deezer/types';

import styles from './deezer-short-album.scss';

const cx = classNames.bind(styles);

export interface DeezerShortAlbumProps {
  album: DeezerAlbum;
  className?: string;
}

const DeezerShortAlbumComponent: FC<DeezerShortAlbumProps> = ({
  album: { cover, title },
  className,
}) => {
  return (
    <div className={cx('album', className)}>
      <img src={cover} className={cx('cover')} />
      <div className={cx('title')} title={title}>
        <b>{title}</b>
      </div>
    </div>
  );
};

export { DeezerShortAlbumComponent };
