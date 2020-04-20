import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { DeezerPlaylistSourceItemFull } from '@app/state/search/types';
import { mapDeezerTracks } from '../../services/mapHelpers';
import { TrackList } from '@app/components/tracks';

import styles from './deezer-playlist-details.scss';

const cx = classNames.bind(styles);

export interface DeezerPlaylistDetailsProps {
  playlist: DeezerPlaylistSourceItemFull;
  className?: string;
}

const DeezerPlaylistDetailsComponent: FC<DeezerPlaylistDetailsProps> = ({
  playlist: {tracks: {data: tracks}, description, fans}, 
  className,
}) => {
  const mappedTracks = mapDeezerTracks(tracks);

  return (
    <div className={cx('album-details', className)}>
      <div>{description}</div>
      <div>{fans} fans</div>
      {!!mappedTracks.length && (
        <div>
          Tracks:
          <TrackList tracks={mappedTracks} />
        </div>
      )}
    </div>
  );
}

export {DeezerPlaylistDetailsComponent}