import React, {FC} from 'react';
import classNames from 'classnames/bind';
import {SpotifyTrackSourceItemShort} from '@app/state/search/types';

import styles from './spotify-track-item.scss';

const cx = classNames.bind(styles);

export interface SpotifyTrackItemProps {
  track: SpotifyTrackSourceItemShort;
  className?: string;
}

const SpotifyTrackItemComponent: FC<SpotifyTrackItemProps> = ({
  track: {name, album, artists},
  className,
}) => {
  return (
    <div className={cx('track', className)}>
      <div>Name: {name}</div>
      <div>Album: {album.name}</div>
      <div>{artists.length < 1 ? 'Artists:' : 'Artist'} {artists.map(({name}) => name).join(', ')}</div>
    </div>
  );
};

export {SpotifyTrackItemComponent};
