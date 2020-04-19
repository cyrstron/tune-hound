import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { DeezerShortTrack } from '@app/components/source-items/components/deezer-short-item';
import { DeezerTrack } from '@app/state/deezer/types';

import styles from './tracks-list.scss';

const cx = classNames.bind(styles);

export interface TracksListProps {
  tracks: Array<Omit<DeezerTrack, 'album'>>;
  className?: string;
}

const TracksListComponent: FC<TracksListProps> = ({
  tracks, 
  className
}) => {
  return (
    <ul className={cx('tracks-list', className)}>
      {tracks.map((track, index) => (
        <li className={cx('track-item')} key={track.id}>
          <div className={cx('index')}>{index + 1}</div>
          <DeezerShortTrack track={track} className={cx('track-content')}/>
        </li>
      ))}
    </ul>
  )
}

export {TracksListComponent}
