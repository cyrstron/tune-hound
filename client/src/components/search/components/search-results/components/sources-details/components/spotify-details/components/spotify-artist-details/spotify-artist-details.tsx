import React, {FC} from 'react';
import classNames from 'classnames/bind';

import styles from './spotify-artist-details.scss';

const cx = classNames.bind(styles);

export interface SpotifyArtistDetailsProps {
  artist: SpotifyApi.ArtistObjectSimplified;
  className?: string;
}

const SpotifyArtistDetailsComponent: FC<SpotifyArtistDetailsProps> = ({
  artist: {name}, 
  className
}) => {
  return (
    <div className={cx('artist-details', className)}>
      <div>Name: {name}</div>
    </div>
  )
}

export {SpotifyArtistDetailsComponent}
