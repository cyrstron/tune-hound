import React, {FC} from 'react';
import { DeezerSearchItem } from '@app/state/search/types';
import { DeezerTrackItem } from './components/deezer-track-item';
import { DeezerAlbumItem } from './components/deezer-album-item';
import { DeezerArtistItem } from './components/deezer-artist-item';

export interface DeezerItemProps {
  object: DeezerSearchItem;
}

const DeezerItemComponent: FC<DeezerItemProps> = ({object}) => {
  switch(object.type) {
    case 'track':
      return <DeezerTrackItem track={object} />;
    case 'album':
      return <DeezerAlbumItem album={object} />;
    case 'artist':
      return <DeezerArtistItem artist={object} />;
    default:
      return null;
  }

}

export {DeezerItemComponent};