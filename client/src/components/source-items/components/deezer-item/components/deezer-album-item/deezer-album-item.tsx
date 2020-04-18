import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { DeezerAlbumSourceItemShort, DeezerAlbumSourceItemFull } from '@app/state/search/types';

import styles from './deezer-album-item.scss';

const cx = classNames.bind(styles);

export interface DeezerAlbumItemProps {
  album: DeezerAlbumSourceItemShort | DeezerAlbumSourceItemFull;
  className?: string;
}

const DeezerAlbumItemComponent: FC<DeezerAlbumItemProps> = ({
  album: {title, artist, nb_tracks}, 
  className
}) => {
  return (
    <>
    <div className={cx('album', className)}>
      <div>Name: {title}</div>
      <div>Artist: {artist.name}</div>
      <div>{nb_tracks} tracks</div>
    </div>
    </>
  )
}

export {DeezerAlbumItemComponent}