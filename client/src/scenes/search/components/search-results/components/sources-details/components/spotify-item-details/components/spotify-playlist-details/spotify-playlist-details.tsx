import React, {FC} from 'react';
import classNames from 'classnames/bind';
import {SpotifyPlaylistSourceItemFull} from '@app/state/search/types';
import {TrackList} from '@app/components/tracks';
import {mapSpotifyTracks} from '../../services/mapHelpers';
import {usePlayerFromDetails} from '../../../../hooks/use-player-from-details';

import styles from './spotify-playlist-details.scss';

const cx = classNames.bind(styles);

export interface SpotifyPlaylistDetailsProps {
  id: string;
  playlist: SpotifyPlaylistSourceItemFull;
  className?: string;
}

const SpotifyPlaylistDetailsComponent: FC<SpotifyPlaylistDetailsProps> = ({
  id,
  playlist: {id: nativeId, tracks: {items: tracks}, description, followers: {total}},
  className,
}) => {
  const playerProps = usePlayerFromDetails(id, 'spotify', nativeId);
  const mappedTracks = mapSpotifyTracks(tracks.map(({track}) => track));

  return (
    <div className={cx('album-details', className)}>
      <div>{description}</div>
      <div>{total} followers</div>
      {!!mappedTracks.length && (
        <div>
          Tracks:
          <TrackList
            tracks={mappedTracks}
            {...playerProps}
          />
        </div>
      )}
    </div>
  );
};

export {SpotifyPlaylistDetailsComponent};
