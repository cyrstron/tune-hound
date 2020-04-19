import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { DeezerArtistSourceItemFull } from '@app/state/search/types';
import { TracksList } from '../tracks-list';
import { AlbumsList } from '../albums-list';

import styles from './deezer-artist-details.scss';

const cx = classNames.bind(styles);

export interface DeezerArtistDetailsProps {
  artist: DeezerArtistSourceItemFull;
  className?: string;
}

const DeezerArtistDetailsComponent: FC<DeezerArtistDetailsProps> = ({
  artist: {topTracks: {data: tracks}, albums: {data: albums}, nb_fan}, 
  className,
}) => {
  return (
    <div className={cx('album-details', className)}>
      <div>
        Top tracks:
        <TracksList tracks={tracks} />
      </div>
      <div>
        Albums:
        <AlbumsList albums={albums} />
      </div>
      <div>{nb_fan} fans</div>
    </div>
  );
}

export {DeezerArtistDetailsComponent}