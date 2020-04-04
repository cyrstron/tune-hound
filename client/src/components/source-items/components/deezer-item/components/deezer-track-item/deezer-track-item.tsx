import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { DeezerTrack } from '@app/state/deezer/types';

import styles from './deezer-track-item.scss';

const cx = classNames.bind(styles);

export interface DeezerTrackItemProps {
  track: DeezerTrack;
  className?: string;
}

const DeezerTrackItemComponent: FC<DeezerTrackItemProps> = ({
  track: {title, album, artist}, 
  className
}) => {
  return (
    <div className={cx('track-details', className)}>
      <div>Name: {title}</div>
      <div>Album: {album.title}</div>
      <div>Artist: {artist.name}</div>
    </div>
  )
}

export {DeezerTrackItemComponent}