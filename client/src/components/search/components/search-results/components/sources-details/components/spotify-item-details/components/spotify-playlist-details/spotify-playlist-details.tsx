import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { SpotifyPlaylistSourceItemFull } from '@app/state/search/types';

import styles from './spotify-playlist-details.scss';
import { TrackList } from '../tracks-list';

const cx = classNames.bind(styles);

export interface SpotifyPlaylistDetailsProps {
  playlist: SpotifyPlaylistSourceItemFull;
  className?: string;
}

const SpotifyPlaylistDetailsComponent: FC<SpotifyPlaylistDetailsProps> = ({
  playlist: {tracks: {items}, description, followers: {total}}, 
  className,
}) => {
  return (
    <div className={cx('album-details', className)}>
      <div>{description}</div>
      <div>{total} followers</div>     
      <TrackList tracks={items.map(({track}) => track)} />
    </div>
  );
}

export {SpotifyPlaylistDetailsComponent}