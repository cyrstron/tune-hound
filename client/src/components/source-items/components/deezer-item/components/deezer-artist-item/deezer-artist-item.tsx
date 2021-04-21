import React, { FC } from 'react';
import classNames from 'classnames/bind';
import { DeezerArtistSourceItemShort } from '@app/features/search/state/types';

import styles from './deezer-artist-item.scss';

const cx = classNames.bind(styles);

export interface DeezerArtistItemProps {
  artist: DeezerArtistSourceItemShort;
  className?: string;
}

const DeezerArtistItemComponent: FC<DeezerArtistItemProps> = ({
  artist: { name, nb_fan: fansNumber, nb_album: albumsNumber },
  className,
}) => {
  return (
    <div className={cx('artist', className)}>
      <div>Name: {name}</div>
      <div>{fansNumber} fans</div>
      <div>{albumsNumber} albums</div>
    </div>
  );
};

export { DeezerArtistItemComponent };
