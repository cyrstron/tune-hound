import React, {FC} from 'react';
import { DeezerTrackDetails } from './components/deezer-track-details';
import { DeezerSearchItem } from '@app/state/search/types';
import { DeezerAlbumDetails } from './components/deezer-album-details';

export interface DeezerDetailsProps {
  object: DeezerSearchItem;
}

const DeezerDetailsComponent: FC<DeezerDetailsProps> = ({object}) => {
  switch(object.type) {
    case 'track':
      return <DeezerTrackDetails track={object} />
    case 'album':
      return <DeezerAlbumDetails album={object} />
    default:
      return null;
  }

}

export {DeezerDetailsComponent};
