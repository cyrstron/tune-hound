import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { SpotifyPlaylistSourceItemFull } from '@app/state/search/types';

import styles from './spotify-playlist-details.scss';
import { TrackList } from '@app/components/tracks';
import { mapSpotifyTracks } from '../../services/mapHelpers';

const cx = classNames.bind(styles);

export interface SpotifyPlaylistDetailsProps {
  playlist: SpotifyPlaylistSourceItemFull;
  className?: string;
}

const SpotifyPlaylistDetailsComponent: FC<SpotifyPlaylistDetailsProps> = ({
  playlist: {tracks: {items: tracks}, description, followers: {total}}, 
  className,
}) => {
  const mappedTracks = mapSpotifyTracks(tracks.map(({track}) => track));

  return (
    <div className={cx('album-details', className)}>
      <div>{description}</div>
      <div>{total} followers</div>     
      {!!mappedTracks.length && (
        <div>
          Tracks:
          <TrackList tracks={mappedTracks} />
        </div>
      )}
    </div>
  );
}

export {SpotifyPlaylistDetailsComponent}