import React, {FC} from 'react';
import { DeezerPlaylistSourceItemFull } from '@app/state/search/types';

export interface DeezerPlaylistDetailsProps {
  playlist: DeezerPlaylistSourceItemFull;
}

const DeezerPlaylistDetailsComponent: FC<DeezerPlaylistDetailsProps> = ({playlist}) => {
  return (
    <div>
      {playlist.title}
    </div>
  )
}

export {DeezerPlaylistDetailsComponent}