import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { DeezerTrack } from '@app/state/deezer/types';

import styles from './deezer-track-details.scss';

const cx = classNames.bind(styles);

export interface DeezerTrackDetailsProps {
  track: DeezerTrack;
  className?: string;
}

const DeezerTrackDetailsComponent: FC<DeezerTrackDetailsProps> = ({
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

export {DeezerTrackDetailsComponent}