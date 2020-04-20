import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { DeezerAlbumSourceItemFull } from '@app/state/search/types';
import { TrackList } from '@app/components/tracks';
import { mapDeezerTracks } from '../../services/mapHelpers';

import styles from './deezer-album-details.scss';

const cx = classNames.bind(styles);

export interface DeezerAlbumDetailsProps {
  album: DeezerAlbumSourceItemFull;
  className?: string;
}

const DeezerAlbumDetailsComponent: FC<DeezerAlbumDetailsProps> = ({
  album: {genres, release_date, tracks: {data: tracks}}, 
  className
}) => {
  const mappedTracks = mapDeezerTracks(tracks);

  return (
    <div className={cx('album-details', className)}>
      {!!genres.data.length && (
        <div>Genres: {genres.data.map(({name}) => name).join(', ')}</div>
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

export {DeezerAlbumDetailsComponent}