import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { DeezerArtistSourceItemFull } from '@app/state/search/types';
import { AlbumTiles } from '@app/components/albums';
import { TrackList } from '@app/components/tracks';
import {mapDeezerAlbums, mapDeezerTracks} from '../../services/mapHelpers';
import { usePlayerFromDetails } from '../../../../hooks/use-player-from-details';
import { usePlayerById } from '../../../../hooks/use-player-by-id';

import styles from './deezer-artist-details.scss';

const cx = classNames.bind(styles);

export interface DeezerArtistDetailsProps {
  id: string;
  artist: DeezerArtistSourceItemFull;
  className?: string;
}

const DeezerArtistDetailsComponent: FC<DeezerArtistDetailsProps> = ({
  id,
  artist: {id: nativeId, topTracks: {data: tracks}, albums: {data: albums}, nb_fan}, 
  className,
}) => {
  const playerProps = usePlayerFromDetails(id, 'deezer', nativeId);
  const albumProps = usePlayerById('album');
  const mappedAlbums = mapDeezerAlbums(albums);
  const mappedTracks = mapDeezerTracks(tracks);

  return (
    <div className={cx('album-details', className)}>
      {!!mappedTracks.length && (
        <div>
          Top tracks:
          <TrackList 
            tracks={mappedTracks} 
            {...playerProps}
          />
        </div>
      )}
      {!!mappedAlbums.length && (
        <div>
          Albums:
          <AlbumTiles albums={mappedAlbums} {...albumProps} />
        </div>
      )}
      <div>{nb_fan} fans</div>
    </div>
  );
}

export {DeezerArtistDetailsComponent}