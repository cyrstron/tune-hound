import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { TrackShort } from '../..';

import styles from './track-list.scss';
import { OrderedTrack } from './components/ordered-track';

const cx = classNames.bind(styles);

export interface TrackListProps {
  tracks: TrackShort[];
  className?: string;
}

const TrackListComponent: FC<TrackListProps> = ({
  tracks, 
  className
}) => {
  return (
    <ul className={cx('tracks-list', className)}>
      {tracks.map((track, index) => (
        <OrderedTrack className={cx('track-item')} index={index} {...track}/>
      ))}
    </ul>
  )
}

export {TrackListComponent}
