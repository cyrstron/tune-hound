import React, {FC} from 'react';
import { DeezerSourceItemFull } from '@app/state/search/types';
import { DeezerFullTrackItem } from './components/deezer-full-track-item';
import { DeezerFullAlbumItem } from './components/deezer-full-album-item';
import { DeezerFullArtistItem } from './components/deezer-full-artist-item';

export interface DeezerFullItemProps {
  object: DeezerSourceItemFull;
}

const DeezerFullItemComponent: FC<DeezerFullItemProps> = ({object}) => {
  switch(object.type) {
    case 'track':
      return <DeezerFullTrackItem track={object} />;
    case 'album':
      return <DeezerFullAlbumItem album={object} />;
    case 'artist':
      return <DeezerFullArtistItem artist={object} />;
    default:
      return null;
  }
}

export {DeezerFullItemComponent};
