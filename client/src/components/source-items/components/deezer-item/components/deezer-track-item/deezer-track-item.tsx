import React, {FC} from 'react';
import classNames from 'classnames/bind';

import styles from './deezer-track-item.scss';
import { DeezerTrackSourceItemShort } from '@app/state/search/types';

const cx = classNames.bind(styles);

export interface DeezerTrackItemProps {
  track: DeezerTrackSourceItemShort;
  className?: string;
}

const DeezerTrackItemComponent: FC<DeezerTrackItemProps> = ({
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

export {DeezerTrackItemComponent}