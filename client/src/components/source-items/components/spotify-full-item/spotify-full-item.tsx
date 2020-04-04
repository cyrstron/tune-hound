import React, {FC} from 'react';
import { SpotifySearchItem } from '@app/state/search/types';
import { SpotifyFullTrackItem } from './components/spotify-full-track-item';
import { SpotifyFullAlbumItem } from './components/spotify-full-album-item';
import { SpotifyFullArtistItem } from './components/spotify-full-artist-item';

export interface SpotifyItemProps {
  object: SpotifySearchItem;
}

const SpotifyFullItemComponent: FC<SpotifyItemProps> = ({object}) => {
  switch(object.type) {
    case 'track':
      return <SpotifyFullTrackItem track={object} />;
    case 'album':
      return <SpotifyFullAlbumItem album={object} />;
    case 'artist':
      return <SpotifyFullArtistItem artist={object} />;
    default:
      return null;
  }

}

export {SpotifyFullItemComponent};
