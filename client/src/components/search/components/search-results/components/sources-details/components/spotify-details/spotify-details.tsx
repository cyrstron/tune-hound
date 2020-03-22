import React, {FC} from 'react';
import { SpotifySearchItem } from '@app/state/search/types';
import { SpotifyTrackDetails } from './components/spotify-track-details';
import { SpotifyAlbumDetails } from './components/spotify-album-details';
import { SpotifyArtistDetails } from './components/spotify-artist-details';

export interface SpotifyDetailsProps {
  object: SpotifySearchItem;
}

const SpotifyDetailsComponent: FC<SpotifyDetailsProps> = ({object}) => {
  switch(object.type) {
    case 'track':
      return <SpotifyTrackDetails track={object} />;
    case 'album':
      return <SpotifyAlbumDetails album={object} />;
    case 'artist':
      return <SpotifyArtistDetails artist={object} />;
    default:
      return null;
  }

}

export {SpotifyDetailsComponent};
