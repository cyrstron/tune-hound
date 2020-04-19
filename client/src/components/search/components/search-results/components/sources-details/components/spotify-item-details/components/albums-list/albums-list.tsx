import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { SpotifyShortAlbum } from '@app/components/source-items/components/spotify-short-item/components/spotify-short-album';

import styles from './albums-list.scss';

const cx = classNames.bind(styles);

export interface AlbumsListProps {
  albums: SpotifyApi.AlbumObjectSimplified[];
  className?: string;
}

const AlbumsListComponent: FC<AlbumsListProps> = ({
  albums, 
  className
}) => {
  return (
    <ul className={cx('album-list', className)}>
      {albums.map((album) => (
        <li className={cx('album-item', className)} key={album.id}>
          <SpotifyShortAlbum album={album}/>
        </li>
      ))}
    </ul>
  )
}

export {AlbumsListComponent}
