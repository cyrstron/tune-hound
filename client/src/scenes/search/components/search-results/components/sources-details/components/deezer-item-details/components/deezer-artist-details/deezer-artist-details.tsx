import React, { FC } from 'react';
import classNames from 'classnames/bind';
import { DeezerArtistSourceItemFull, SearchSource } from '@app/state/search/types';
import { AlbumTiles } from '@app/components/albums';
import { TrackList } from '@app/components/tracks';
import { mapDeezerAlbums, mapDeezerTracks } from '../../services/mapHelpers';
import { usePlayerFromDetails } from '../../../../hooks/use-player-from-details';
import { usePlayerById } from '../../../../hooks/use-player-by-id';

import styles from './deezer-artist-details.scss';
import { PlaylistType } from '@app/state/player/types';

const cx = classNames.bind(styles);

export interface DeezerArtistDetailsProps {
  id: string;
  artist: DeezerArtistSourceItemFull;
  className?: string;
}

const DeezerArtistDetailsComponent: FC<DeezerArtistDetailsProps> = ({
  id,
  artist: {
    id: nativeId,
    topTracks: { data: tracks },
    albums: { data: albums },
    nb_fan: fansNumber,
  },
  className,
}) => {
  const playerProps = usePlayerFromDetails(id, SearchSource.DEEZER, nativeId);
  const albumProps = usePlayerById(PlaylistType.ALBUM);
  const mappedAlbums = mapDeezerAlbums(albums);
  const mappedTracks = mapDeezerTracks(tracks);

  return (
    <div className={cx('artist-details', className)}>
      {!!mappedTracks.length && (
        <div>
          Top tracks:
          <TrackList tracks={mappedTracks} {...playerProps} />
        </div>
      )}
      {!!mappedAlbums.length && (
        <div>
          Albums:
          <AlbumTiles albums={mappedAlbums} {...albumProps} />
        </div>
      )}
      <div>{fansNumber} fans</div>
    </div>
  );
};

export { DeezerArtistDetailsComponent };
