import React, { FC } from 'react';
import classNames from 'classnames/bind';
import { SearchSource, SpotifyAlbumSourceItemFull } from '@app/state/search/types';
import { mapSpotifyTracks } from '../../services/mapHelpers';
import { TrackList } from '@app/components/tracks';

import styles from './spotify-album-details.scss';
import { usePlayerFromDetails } from '../../../../hooks/use-player-from-details';
import { PlaylistType } from '@app/state/player/types';

const cx = classNames.bind(styles);

export interface SpotifyAlbumDetailsProps {
  id: string;
  album: SpotifyAlbumSourceItemFull;
  className?: string;
}

const SpotifyAlbumDetailsComponent: FC<SpotifyAlbumDetailsProps> = ({
  id,
  album: {
    id: nativeId,
    genres,
    release_date: releaseDate,
    tracks: { items: tracks },
  },
  className,
}) => {
  const playerProps = usePlayerFromDetails(id, SearchSource.SPOTIFY, nativeId, PlaylistType.ALBUM);
  const mappedTracks = mapSpotifyTracks(tracks);

  return (
    <div className={cx('album-details', className)}>
      {!!genres.length && <div>Genres: {genres.join(', ')}</div>}
      {!!mappedTracks.length && (
        <div>
          Tracks:
          <TrackList tracks={mappedTracks} {...playerProps} />
        </div>
      )}
      <div>Released: {releaseDate}</div>
    </div>
  );
};

export { SpotifyAlbumDetailsComponent };
