import React, {FC} from 'react';
import classNames from 'classnames/bind';

import styles from './spotify-album-item.scss';

const cx = classNames.bind(styles);

export interface SpotifyAlbumItemProps {
  album: SpotifyApi.AlbumObjectSimplified;
  className?: string;
}

const SpotifyAlbumItemComponent: FC<SpotifyAlbumItemProps> = ({
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

export {SpotifyAlbumItemComponent}