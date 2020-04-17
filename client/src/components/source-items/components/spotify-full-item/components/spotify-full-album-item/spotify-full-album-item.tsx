import React, {FC} from 'react';
import classNames from 'classnames/bind';

import styles from './spotify-full-album-item.scss';

const cx = classNames.bind(styles);

export interface SpotifyFullAlbumItemProps {
  album: SpotifyApi.AlbumObjectSimplified;
  className?: string;
}

const SpotifyFullAlbumItemComponent: FC<SpotifyFullAlbumItemProps> = ({
  album: {name, artists, release_date}, 
  className
}) => {
  return (
    <div className={cx('album', className)}>
      <div>Name: {name}</div>
      <div>{artists.length < 1 ? 'Artists:' : 'Artist'} {artists.map(({name}) => name).join(', ')}</div>
      <div>Released: {release_date}</div>
    </div>
  )
}

export {SpotifyFullAlbumItemComponent}