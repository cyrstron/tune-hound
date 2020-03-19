import React, {FC} from 'react';
import { DeezerTrackDetails } from './components/deezer-track-details';
import { DeezerSearchItem } from '@app/state/search/types';

export interface DeezerDetailsProps {
  object: DeezerSearchItem;
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
