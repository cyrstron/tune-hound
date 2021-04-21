import React, { FC } from 'react';
import classNames from 'classnames/bind';

import styles from './spotify-full-album-item.scss';
import { SpotifyAlbumSourceItemFull } from '@app/features/search/state/types';

const cx = classNames.bind(styles);

export interface SpotifyFullAlbumItemProps {
  album: SpotifyAlbumSourceItemFull;
  className?: string;
}

const SpotifyFullAlbumItemComponent: FC<SpotifyFullAlbumItemProps> = ({
  album: { name, artists, release_date: releaseDate },
  className,
}) => {
  return (
    <div className={cx('album', className)}>
      <div>Name: {name}</div>
      <div>
        {artists.length < 1 ? 'Artists:' : 'Artist'} {artists.map(({ name }) => name).join(', ')}
      </div>
      <div>Released: {releaseDate}</div>
    </div>
  );
};

export { SpotifyFullAlbumItemComponent };
