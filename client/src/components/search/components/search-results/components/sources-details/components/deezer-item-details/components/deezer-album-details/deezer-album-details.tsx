import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { DeezerAlbumSourceItemFull } from '@app/state/search/types';
import { TracksList } from '../tracks-list';

import styles from './deezer-album-details.scss';

const cx = classNames.bind(styles);

export interface DeezerAlbumDetailsProps {
  album: DeezerAlbumSourceItemFull;
  className?: string;
}

const DeezerAlbumDetailsComponent: FC<DeezerAlbumDetailsProps> = ({
  album: {genres, release_date, tracks: {data}}, 
  className
}) => {
  return (
    <div className={cx('album-details', className)}>
      {!!genres.data.length && (
        <div>Genres: {genres.data.map(({name}) => name).join(', ')}</div>
      )}
      <TracksList tracks={data} className={cx('tracks')}/>
      <div>Released: {release_date}</div>
    </div>
  );
}

export {DeezerAlbumDetailsComponent}