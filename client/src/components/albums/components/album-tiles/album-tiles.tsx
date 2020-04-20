import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { AlbumTileItem } from './components/album-tile-item';
import {AlbumShort} from '../..';

import styles from './album-tiles.scss';

const cx = classNames.bind(styles);


export interface AlbumTilesProps {
  albums: AlbumShort[];
  className?: string;
}

const AlbumTilesComponent: FC<AlbumTilesProps> = ({
  albums, 
  className
}) => {
  return (
    <ul className={cx('album-list', className)}>
      {albums.map((album) => (
        <AlbumTileItem key={album.id} className={cx('album-item')} {...album}/>
      ))}
    </ul>
  )
}

export {AlbumTilesComponent}
