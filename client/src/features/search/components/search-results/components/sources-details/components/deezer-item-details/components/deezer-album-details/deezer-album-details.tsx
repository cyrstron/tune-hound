import React, { FC } from 'react';
import classNames from 'classnames/bind';
import { DeezerAlbumSourceItemFull, SearchSource } from '@app/features/search/state/types';
import { TrackList } from '@app/components/tracks';
import { mapDeezerTracks } from '../../services/mapHelpers';

import styles from './deezer-album-details.scss';
import { usePlayerFromDetails } from '../../../../hooks/use-player-from-details';
import { PlaylistType } from '@app/state/player/types';

const cx = classNames.bind(styles);

export interface DeezerAlbumDetailsProps {
  id: string;
  album: DeezerAlbumSourceItemFull;
  className?: string;
}

const DeezerAlbumDetailsComponent: FC<DeezerAlbumDetailsProps> = ({
  id,
  album: {
    id: nativeId,
    genres,
    release_date: releaseDate,
    tracks: { data: tracks },
  },
  className,
}) => {
  const playerProps = usePlayerFromDetails(id, SearchSource.DEEZER, nativeId, PlaylistType.ALBUM);
  const mappedTracks = mapDeezerTracks(tracks);

  return (
    <div className={cx('album-details', className)}>
      {!!genres.data.length && <div>Genres: {genres.data.map(({ name }) => name).join(', ')}</div>}
      {!!mappedTracks.length && (
        <div>
          Tracks:
          <TrackList tracks={mappedTracks} {...playerProps} />
        </div>
      )}
      <div>Released: {releaseDate}</div>
    </div>
  );
};

export { DeezerAlbumDetailsComponent };
