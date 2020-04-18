import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { DeezerArtistSourceItemFull } from '@app/state/search/types';

import styles from './deezer-full-artist-item.scss';

const cx = classNames.bind(styles);

export interface DeezerFullArtistItemProps {
  artist: DeezerArtistSourceItemFull;
  className?: string;
}

const DeezerFullArtistItemComponent: FC<DeezerFullArtistItemProps> = ({
  artist: {name, nb_fan, nb_album}, 
  className
}) => {
  return (
    <div className={cx('artist-details', className)}>
      <div>Name: {name}</div>
      <div>{nb_fan} fans</div>
      <div>{nb_album} albums</div>
    </div>
  )
}

export {DeezerFullArtistItemComponent}