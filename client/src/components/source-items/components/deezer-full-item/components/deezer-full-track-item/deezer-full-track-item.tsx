import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { DeezerTrack } from '@app/state/deezer/types';

import styles from './deezer-full-track-item.scss';

const cx = classNames.bind(styles);

export interface DeezerFullTrackItemProps {
  track: DeezerTrack;
  className?: string;
}

const DeezerFullTrackItemComponent: FC<DeezerFullTrackItemProps> = ({
  track: {title, album, artist}, 
  className
}) => {
  return (
    <div className={cx('track', className)}>
      <div>Name: {title}</div>
      <div>Album: {album.title}</div>
      <div>Artist: {artist.name}</div>
    </div>
  )
}

export {DeezerFullTrackItemComponent}