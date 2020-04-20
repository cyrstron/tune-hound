import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { SpotifyArtistSourceItemFull } from '@app/state/search/types';
import { AlbumTiles } from '@app/components/albums';

import styles from './spotify-artist-details.scss';
import { mapSpotifyAlbums, mapSpotifyTracks } from '../../services/mapHelpers';
import { TrackList } from '@app/components/tracks';

const cx = classNames.bind(styles);

export interface SpotifyArtistDetailsProps {
  artist: SpotifyArtistSourceItemFull;
  className?: string;
}

const SpotifyArtistDetailsComponent: FC<SpotifyArtistDetailsProps> = ({
  artist: {topTracks, albums, followers: {total}, genres}, 
  className,
}) => {
  const mappedAlbums = mapSpotifyAlbums(albums);
  const mappedTracks = mapSpotifyTracks(topTracks);

  return (
    <div className={cx('album-details', className)}>
      {!!genres.length && (
        <div>Genres: {genres.join(', ')}</div>
      )}
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
      <div>{total} followers</div>
    </div>
  );
}

export {SpotifyArtistDetailsComponent}