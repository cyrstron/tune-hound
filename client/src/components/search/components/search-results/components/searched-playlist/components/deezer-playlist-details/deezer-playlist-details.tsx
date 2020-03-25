import React, {FC} from 'react';
import { DeezerPlaylist } from '@app/state/deezer/types';

export interface DeezerPlaylistDetailsProps {
  playlist: DeezerPlaylist;
}

const DeezerPlaylistDetailsComponent: FC<DeezerPlaylistDetailsProps> = ({playlist}) => {
  return (
    <div>
      {playlist.title}
    </div>
  )
}

export {DeezerPlaylistDetailsComponent}