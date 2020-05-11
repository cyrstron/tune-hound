import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { SpotifyAlbumSourceItemFull } from '@app/state/search/types';
import { mapSpotifyTracks } from '../../services/mapHelpers';
import { TrackList } from '@app/components/tracks';

import styles from './spotify-album-details.scss';
import { usePlayerFromDetails } from '../../../../hooks/use-player-from-details';

const cx = classNames.bind(styles);

export interface SpotifyAlbumDetailsProps {
  id: string;
  album: SpotifyAlbumSourceItemFull;
  className?: string;
}

const SpotifyAlbumDetailsComponent: FC<SpotifyAlbumDetailsProps> = ({
  id,
  album: {id: nativeId, genres, release_date, tracks: {items: tracks}}, 
  className
}) => {
  const playerProps = usePlayerFromDetails(id, 'spotify', nativeId, 'album');
  const mappedTracks = mapSpotifyTracks(tracks);

  return (
    <div className={cx('album-details', className)}>
      {!!genres.length && (
        <div>Genres: {genres.join(', ')}</div>
      )}
      {!!mappedTracks.length && (
        <div>
          Tracks:
          <TrackList 
            tracks={mappedTracks} 
            {...playerProps}
          />
        </div>
      )}
      <div>Released: {release_date}</div>
    </div>
  );
}

export {SpotifyAlbumDetailsComponent}