import React, {FC} from 'react';
import classNames from 'classnames/bind';

import styles from './spotify-artist-item.scss';
import { SpotifyArtistSourceItemShort, SpotifyArtistSourceItemFull } from '@app/state/search/types';

const cx = classNames.bind(styles);

export interface SpotifyArtistItemProps {
  artist: SpotifyArtistSourceItemShort | SpotifyArtistSourceItemFull;
  className?: string;
}

const SpotifyArtistItemComponent: FC<SpotifyArtistItemProps> = ({
  artist: {name}, 
  className
}) => {
  return (
    <div className={cx('artist', className)}>
      <div>Name: {name}</div>
    </div>
  )
}

export {SpotifyArtistItemComponent}
