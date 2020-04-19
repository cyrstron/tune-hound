import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { SpotifyAlbumSourceItemFull } from '@app/state/search/types';
import { TrackList } from '../tracks-list';

import styles from './spotify-album-details.scss';

const cx = classNames.bind(styles);

export interface SpotifyAlbumDetailsProps {
  album: SpotifyAlbumSourceItemFull;
  className?: string;
}

const SpotifyAlbumDetailsComponent: FC<SpotifyAlbumDetailsProps> = ({
  album: {genres, release_date, tracks: {items}}, 
  className
}) => {
  return (
    <div className={cx('album-details', className)}>
      {!!genres.length && (
        <div>Genres: {genres.join(', ')}</div>
      )}
      <TrackList tracks={items} className={cx('tracks')}/>
      <div>Released: {release_date}</div>
    </div>
  );
}

export {SpotifyAlbumDetailsComponent}