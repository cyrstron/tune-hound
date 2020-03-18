import React, {FC} from 'react';
import { DeezerTrackDetails } from './components/deezer-track-details';
import { DeezerTrack } from '@app/state/deezer/types';

export interface DeezerDetailsProps {
  object: DeezerTrack;
}

const DeezerDetailsComponent: FC<DeezerDetailsProps> = ({object}) => {
  switch(object.type) {
    case 'track':
      return <DeezerTrackDetails track={object} />
    default:
      return null;
  }

}

export {DeezerDetailsComponent};
