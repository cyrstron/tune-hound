import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { DeezerPlaylistSourceItemFull } from '@app/state/search/types';
import { TracksList } from '../tracks-list';

import styles from './deezer-playlist-details.scss';

const cx = classNames.bind(styles);

export interface DeezerPlaylistDetailsProps {
  playlist: DeezerPlaylistSourceItemFull;
  className?: string;
}

const DeezerPlaylistDetailsComponent: FC<DeezerPlaylistDetailsProps> = ({
  playlist: {tracks: {data}, description, fans}, 
  className,
}) => {
  return (
    <div className={cx('album-details', className)}>
      <div>{description}</div>
      <div>{fans} fans</div>
      <TracksList tracks={data} />
    </div>
  );
}

export {DeezerPlaylistDetailsComponent}