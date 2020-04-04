import React, {FC} from 'react';
import classNames from 'classnames/bind';

import styles from './spotify-full-artist-item.scss';

const cx = classNames.bind(styles);

export interface SpotifyFullArtistItemProps {
  artist: SpotifyApi.ArtistObjectSimplified;
  className?: string;
}

const SpotifyFullArtistItemComponent: FC<SpotifyFullArtistItemProps> = ({
  artist: {name}, 
  className
}) => {
  return (
    <div className={cx('artist', className)}>
      <div>Name: {name}</div>
    </div>
  )
}

export {SpotifyFullArtistItemComponent}
