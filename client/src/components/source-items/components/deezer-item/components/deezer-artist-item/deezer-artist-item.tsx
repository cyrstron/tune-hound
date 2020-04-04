import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { DeezerArtist } from '@app/state/deezer/types';

import styles from './deezer-artist-item.scss';

const cx = classNames.bind(styles);

export interface DeezerArtistItemProps {
  artist: DeezerArtist;
  className?: string;
}

const DeezerArtistItemComponent: FC<DeezerArtistItemProps> = ({
  artist: {name, nb_fan, nb_album}, 
  className
}) => {
  return (
    <div className={cx('artist', className)}>
      <div>Name: {name}</div>
      <div>{nb_fan} fans</div>
      <div>{nb_album} albums</div>
    </div>
  )
}

export {DeezerArtistItemComponent}