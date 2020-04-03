import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import { DeezerSearchItem } from '@app/state/search/types';
import { selectItemsForExtension } from '@app/state/search/selectors';
import { DeezerTrackDetails } from './components/deezer-track-details';
import { DeezerAlbumDetails } from './components/deezer-album-details';
import { DeezerArtistDetails } from './components/deezer-artist-details';
import { AppState } from '@app/state';

export interface DeezerDetailsProps {
  object: DeezerSearchItem;
}

const DeezerDetailsComponent: FC<DeezerDetailsProps> = ({object}) => {
  switch(object.type) {
    case 'track':
      return <DeezerTrackDetails track={object} />;
    case 'album':
      return <DeezerAlbumDetails album={object} />;
    case 'artist':
      return <DeezerArtistDetails artist={object} />;
    default:
      return null;
  }

}

export {DeezerDetailsComponent};
