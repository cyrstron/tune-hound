import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { DeezerArtist } from '@app/state/deezer/types';

import styles from './deezer-artist-details.scss';

const cx = classNames.bind(styles);

export interface DeezerArtistDetailsProps {
  artist: DeezerArtist;
  className?: string;
}

const DeezerArtistDetailsComponent: FC<DeezerArtistDetailsProps> = ({
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

export {DeezerArtistDetailsComponent}