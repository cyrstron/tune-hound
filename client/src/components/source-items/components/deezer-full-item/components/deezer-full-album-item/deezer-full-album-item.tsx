import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { DeezerAlbum } from '@app/state/deezer/types';

import styles from './deezer-full-album-item.scss';

const cx = classNames.bind(styles);

export interface DeezerFullAlbumItemProps {
  album: DeezerAlbum;
  className?: string;
}

const DeezerFullAlbumItemComponent: FC<DeezerFullAlbumItemProps> = ({
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

export {DeezerFullAlbumItemComponent}