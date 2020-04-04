import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { DeezerAlbum } from '@app/state/deezer/types';

import styles from './deezer-album-item.scss';

const cx = classNames.bind(styles);

export interface DeezerAlbumItemProps {
  album: DeezerAlbum;
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