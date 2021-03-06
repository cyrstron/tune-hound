import React, { FC } from 'react';
import { SpotifySourceItemFull } from '@app/features/search/state/types';
import { SpotifyFullTrackItem } from './components/spotify-full-track-item';
import { SpotifyFullAlbumItem } from './components/spotify-full-album-item';
import { SpotifyFullArtistItem } from './components/spotify-full-artist-item';

export interface SpotifyItemProps {
  object: SpotifySourceItemFull;
}

const SpotifyFullItemComponent: FC<SpotifyItemProps> = ({ object }) => {
  switch (object.type) {
    case 'track':
      return <SpotifyFullTrackItem track={object} />;
    case 'album':
      return <SpotifyFullAlbumItem album={object} />;
    case 'artist':
      return <SpotifyFullArtistItem artist={object} />;
    default:
      return null;
  }
};

export { SpotifyFullItemComponent };
