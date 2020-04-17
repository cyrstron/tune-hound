import React, {FC} from 'react';
import { SpotifySearchItem } from '@app/state/search/types';
import { SpotifyTrackItem } from './components/spotify-track-item';
import { SpotifyAlbumItem } from './components/spotify-album-item';
import { SpotifyArtistItem } from './components/spotify-artist-item';

export interface SpotifyItemProps {
  object: SpotifySearchItem;
}

const SpotifyItemComponent: FC<SpotifyItemProps> = ({object}) => {
  switch(object.type) {
    case 'track':
      return <SpotifyTrackItem track={object} />;
    case 'album':
      return <SpotifyAlbumItem album={object} />;
    case 'artist':
      return <SpotifyArtistItem artist={object} />;
    default:
      return null;
  }

}

export {SpotifyItemComponent};