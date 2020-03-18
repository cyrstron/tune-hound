import React, {FC} from 'react';
import classNames from 'classnames/bind';

import styles from './spotify-track-details.scss';

const cx = classNames.bind(styles);

export interface SpotifyTrackDetailsProps {
  track: SpotifyApi.TrackObjectFull;
  className?: string;
}

const SpotifyTrackDetailsComponent: FC<SpotifyTrackDetailsProps> = ({
  track: {name, album, artists}, 
  className
}) => {
  return (
    <div className={cx('track-details', className)}>
      <div>Name: {name}</div>
      <div>Album: {album.name}</div>
      <div>{artists.length < 1 ? 'Artists:' : 'Artist'} {artists.map(({name}) => name).join(', ')}</div>
    </div>
  )
}

export {SpotifyTrackDetailsComponent}