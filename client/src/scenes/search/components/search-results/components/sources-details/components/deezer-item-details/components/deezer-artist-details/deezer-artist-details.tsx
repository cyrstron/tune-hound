import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { DeezerArtistSourceItemFull } from '@app/state/search/types';
import { AlbumTiles } from '@app/components/albums';
import { TrackList } from '@app/components/tracks';
import {mapDeezerAlbums, mapDeezerTracks} from '../../services/mapHelpers';

import styles from './deezer-artist-details.scss';

const cx = classNames.bind(styles);

export interface DeezerArtistDetailsProps {
  artist: DeezerArtistSourceItemFull;
  className?: string;
}

const DeezerArtistDetailsComponent: FC<DeezerArtistDetailsProps> = ({
  artist: {topTracks: {data: tracks}, albums: {data: albums}, nb_fan}, 
  className,
}) => {
  const mappedAlbums = mapDeezerAlbums(albums);
  const mappedTracks = mapDeezerTracks(tracks);

  return (
    <div className={cx('album-details', className)}>
      {!!mappedTracks.length && (
        <div>
          Top tracks:
          <TrackList tracks={mappedTracks} />
        </div>
      )}
      {!!mappedAlbums.length && (
        <div>
          Albums:
          <AlbumTiles albums={mappedAlbums} />
        </div>
      )}
      <div>{nb_fan} fans</div>
    </div>
  );
}

export {DeezerArtistDetailsComponent}