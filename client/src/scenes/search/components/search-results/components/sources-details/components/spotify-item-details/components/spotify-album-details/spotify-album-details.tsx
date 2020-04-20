import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { SpotifyAlbumSourceItemFull } from '@app/state/search/types';
import { mapSpotifyTracks } from '../../services/mapHelpers';
import { TrackList } from '@app/components/tracks';

import styles from './spotify-album-details.scss';

const cx = classNames.bind(styles);

export interface SpotifyAlbumDetailsProps {
  album: SpotifyAlbumSourceItemFull;
  className?: string;
}

const SpotifyAlbumDetailsComponent: FC<SpotifyAlbumDetailsProps> = ({
  album: {genres, release_date, tracks: {items: tracks}}, 
  className
}) => {
  const mappedTracks = mapSpotifyTracks(tracks);

  return (
    <div className={cx('album-details', className)}>
      {!!genres.length && (
        <div>Genres: {genres.join(', ')}</div>
      )}
      {!!mappedTracks.length && (
        <div>
          Tracks:
          <TrackList tracks={mappedTracks} />
        </div>
      )}
      <div>Released: {release_date}</div>
    </div>
  );
}

export {SpotifyAlbumDetailsComponent}