import React, { FC } from 'react';
import classNames from 'classnames/bind';
import { AlbumTileItem } from './components/album-tile-item';
import { AlbumShort } from '../..';

import styles from './album-tiles.scss';
import { SearchSource } from '@app/features/search/state/types';

const cx = classNames.bind(styles);

export interface AlbumTilesProps {
  albums: AlbumShort[];
  className?: string;
  activeId?: string | number;
  isPlaying: boolean;
  isPending: boolean;
  isPaused: boolean;
  onPlay: (id: string | number, source: SearchSource) => void;
  onPause: () => void;
}

const AlbumTilesComponent: FC<AlbumTilesProps> = ({
  albums,
  className,
  activeId,
  isPlaying,
  isPending,
  isPaused,
  onPlay,
  onPause,
}) => {
  return (
    <ul className={cx('album-list', className)}>
      {albums.map(album => {
        const isActive = activeId === album.id;

        return (
          <AlbumTileItem
            key={album.id}
            className={cx('album-item')}
            isPlaying={isActive && isPlaying}
            isPending={isActive && isPending}
            isPaused={isActive && isPaused}
            onPlay={onPlay}
            onPause={onPause}
            {...album}
          />
        );
      })}
    </ul>
  );
};

export { AlbumTilesComponent };
