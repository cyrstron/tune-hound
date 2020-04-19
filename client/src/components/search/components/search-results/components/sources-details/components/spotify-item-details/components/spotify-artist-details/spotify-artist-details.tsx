import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { SpotifyArtistSourceItemFull } from '@app/state/search/types';
import { TrackList } from '../tracks-list';

import styles from './spotify-artist-details.scss';
import { AlbumsList } from '../albums-list';

const cx = classNames.bind(styles);

export interface SpotifyArtistDetailsProps {
  artist: SpotifyArtistSourceItemFull;
  className?: string;
}

const SpotifyArtistDetailsComponent: FC<SpotifyArtistDetailsProps> = ({
  artist: {topTracks, albums, followers: {total}, genres}, 
  className,
}) => {
  return (
    <div className={cx('album-details', className)}>
      {!!genres.length && (
        <div>Genres: {genres.join(', ')}</div>
      )}
      <div>
        Top tracks:
        <TrackList tracks={topTracks} />
      </div>
      <div>
        Albums:
        <AlbumsList albums={albums} />
      </div>
      <div>{total} followers</div>
    </div>
  );
}

export {SpotifyArtistDetailsComponent}