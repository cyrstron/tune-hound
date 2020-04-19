import React, {FC} from 'react';
import classNames from 'classnames/bind';

import styles from './spotify-short-album.scss';

const cx = classNames.bind(styles);

export interface SpotifyShortAlbumProps {
  album: SpotifyApi.AlbumObjectSimplified;
  className?: string;
}

const SpotifyShortAlbumComponent: FC<SpotifyShortAlbumProps> = ({
  album: {name, images: [{url}], release_date}, 
  className,
}) => {
  return (
    <div className={cx('album', className)}>
      <img src={url} className={cx('cover')}/>
      <div><b>{name}</b></div>
      <div>{release_date}</div>
    </div>
  );
}

export {SpotifyShortAlbumComponent}