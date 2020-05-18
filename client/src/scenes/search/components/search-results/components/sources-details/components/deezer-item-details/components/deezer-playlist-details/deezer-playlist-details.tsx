import React, {FC} from 'react';
import classNames from 'classnames/bind';
import {DeezerPlaylistSourceItemFull} from '@app/state/search/types';
import {mapDeezerTracks} from '../../services/mapHelpers';
import {TrackList} from '@app/components/tracks';

import styles from './deezer-playlist-details.scss';
import {usePlayerFromDetails} from '../../../../hooks/use-player-from-details';

const cx = classNames.bind(styles);

export interface DeezerPlaylistDetailsProps {
  id: string;
  playlist: DeezerPlaylistSourceItemFull;
  className?: string;
}

const DeezerPlaylistDetailsComponent: FC<DeezerPlaylistDetailsProps> = ({
  id,
  playlist: {id: nativeId, tracks: {data: tracks}, description, fans},
  className,
}) => {
  const playerProps = usePlayerFromDetails(id, 'deezer', nativeId);
  const mappedTracks = mapDeezerTracks(tracks);

  return (
    <div className={cx('album-details', className)}>
      <div>{description}</div>
      <div>{fans} fans</div>
      {!!mappedTracks.length && (
        <div>
          Tracks:
          <TrackList
            tracks={mappedTracks}
            {...playerProps}
          />
        </div>
      )}
    </div>
  );
};

export {DeezerPlaylistDetailsComponent};
