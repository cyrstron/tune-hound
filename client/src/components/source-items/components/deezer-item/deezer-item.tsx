import React, { FC } from 'react';
import { DeezerSourceItemShort } from '@app/features/search/state/types';
import { DeezerTrackItem } from './components/deezer-track-item';
import { DeezerAlbumItem } from './components/deezer-album-item';
import { DeezerArtistItem } from './components/deezer-artist-item';

export interface DeezerItemProps {
  object: DeezerSourceItemShort;
}

const DeezerItemComponent: FC<DeezerItemProps> = ({ object }) => {
  switch (object.type) {
    case 'track':
      return <DeezerTrackItem track={object} />;
    case 'album':
      return <DeezerAlbumItem album={object} />;
    case 'artist':
      return <DeezerArtistItem artist={object} />;
    default:
      return null;
  }
};

export { DeezerItemComponent };
