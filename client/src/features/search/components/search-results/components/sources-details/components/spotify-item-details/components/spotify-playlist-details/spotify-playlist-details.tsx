import React, { FC } from 'react';
import classNames from 'classnames/bind';
import { SearchSource, SpotifyPlaylistSourceItemFull } from '@app/features/search/state/types';
import { TrackList } from '@app/components/tracks';
import { mapSpotifyTracks } from '../../services/mapHelpers';
import { usePlayerFromDetails } from '../../../../hooks/use-player-from-details';

import styles from './spotify-playlist-details.scss';

const cx = classNames.bind(styles);

export interface SpotifyPlaylistDetailsProps {
  id: string;
  playlist: SpotifyPlaylistSourceItemFull;
  className?: string;
}

const SpotifyPlaylistDetailsComponent: FC<SpotifyPlaylistDetailsProps> = ({
  id,
  playlist: {
    id: nativeId,
    tracks: { items: tracks },
    description,
    followers: { total },
  },
  className,
}) => {
  const playerProps = usePlayerFromDetails(id, SearchSource.SPOTIFY, nativeId);
  const mappedTracks = mapSpotifyTracks(tracks.map(({ track }) => track));

  return (
    <div className={cx('album-details', className)}>
      <div>{description}</div>
      <div>{total} followers</div>
      {!!mappedTracks.length && (
        <div>
          Tracks:
          <TrackList tracks={mappedTracks} {...playerProps} />
        </div>
      )}
    </div>
  );
};

export { SpotifyPlaylistDetailsComponent };
