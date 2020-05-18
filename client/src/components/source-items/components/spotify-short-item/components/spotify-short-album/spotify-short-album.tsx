import React, {FC} from 'react';
import classNames from 'classnames/bind';

import styles from './spotify-short-album.scss';

const cx = classNames.bind(styles);

export interface SpotifyShortAlbumProps {
  album: SpotifyApi.AlbumObjectSimplified;
  className?: string;
}

const SpotifyShortAlbumComponent: FC<SpotifyShortAlbumProps> = ({
  album: {name, images: [{url}], 'release_date': releaseDate},
  className,
}) => {
  return (
    <div className={cx('album', className)}>
      <img src={url} className={cx('cover')}/>
      <div className={cx('title')} title={name}><b>{name}</b></div>
      <div>{releaseDate}</div>
    </div>
  );
};

export {SpotifyShortAlbumComponent};
