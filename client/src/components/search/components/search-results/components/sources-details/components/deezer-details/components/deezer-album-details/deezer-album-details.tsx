import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { DeezerAlbum } from '@app/state/deezer/types';

import styles from './deezer-album-details.scss';

const cx = classNames.bind(styles);

export interface DeezerAlbumDetailsProps {
  album: DeezerAlbum;
  className?: string;
}

const DeezerAlbumDetailsComponent: FC<DeezerAlbumDetailsProps> = ({
  album: {title, artist, nb_tracks}, 
  className
}) => {
  return (
    <div className={cx('album-details', className)}>
      <div>Name: {title}</div>
      <div>Artist: {artist.name}</div>
      <div>{nb_tracks} tracks</div>
    </div>
  )
}

export {DeezerAlbumDetailsComponent}