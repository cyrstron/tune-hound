import React, {FC} from 'react';
import classNames from 'classnames/bind';

import styles from './spotify-full-track-item.scss';

const cx = classNames.bind(styles);

export interface SpotifyFullTrackItemProps {
  track: SpotifyApi.TrackObjectFull;
  className?: string;
}

const SpotifyFullTrackItemComponent: FC<SpotifyFullTrackItemProps> = ({
  track: {name, album, artists}, 
  className
}) => {
  return (
    <div className={cx('track', className)}>
      <div>Name: {name}</div>
      <div>Album: {album.name}</div>
      <div>{artists.length < 1 ? 'Artists:' : 'Artist'} {artists.map(({name}) => name).join(', ')}</div>
    </div>
  )
}

export {SpotifyFullTrackItemComponent}