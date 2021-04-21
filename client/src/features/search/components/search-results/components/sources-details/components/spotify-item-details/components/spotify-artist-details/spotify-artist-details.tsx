import React, { FC } from 'react';
import classNames from 'classnames/bind';
import { SearchSource, SpotifyArtistSourceItemFull } from '@app/features/search/search/types';
import { AlbumTiles } from '@app/components/albums';
import { mapSpotifyAlbums, mapSpotifyTracks } from '../../services/mapHelpers';
import { TrackList } from '@app/components/tracks';
import { usePlayerFromDetails } from '../../../../hooks/use-player-from-details';
import { usePlayerById } from '../../../../hooks/use-player-by-id';

import styles from './spotify-artist-details.scss';
import { PlaylistType } from '@app/state/player/types';

const cx = classNames.bind(styles);

export interface SpotifyArtistDetailsProps {
  id: string;
  artist: SpotifyArtistSourceItemFull;
  className?: string;
}

const SpotifyArtistDetailsComponent: FC<SpotifyArtistDetailsProps> = ({
  id,
  artist: {
    id: nativeId,
    topTracks,
    albums,
    followers: { total },
    genres,
  },
  className,
}) => {
  const playerProps = usePlayerFromDetails(id, SearchSource.SPOTIFY, nativeId);
  const albumsProps = usePlayerById(PlaylistType.ALBUM);
  const mappedAlbums = mapSpotifyAlbums(albums);
  const mappedTracks = mapSpotifyTracks(topTracks);

  return (
    <div className={cx('artist-details', className)}>
      {!!genres.length && <div>Genres: {genres.join(', ')}</div>}
      {!!mappedTracks.length && (
        <div>
          Top tracks:
          <TrackList tracks={mappedTracks} {...playerProps} />
        </div>
      )}
      {!!mappedAlbums.length && (
        <div>
          Albums:
          <AlbumTiles albums={mappedAlbums} {...albumsProps} />
        </div>
      )}
      <div>{total} followers</div>
    </div>
  );
};

export { SpotifyArtistDetailsComponent };
