import React, {FC} from 'react';
import { SpotifyTrackDetails } from './components/spotify-track-details';
import { SpotifySearchItem } from '@app/state/search/types';
import { SpotifyAlbumDetails } from './components/spotify-album-details';

export interface SpotifyDetailsProps {
  object: SpotifySearchItem;
}

const SpotifyDetailsComponent: FC<SpotifyDetailsProps> = ({object}) => {
  switch(object.type) {
    case 'track':
      return <SpotifyTrackDetails track={object} />
    case 'album':
      return <SpotifyAlbumDetails album={object} />
    default:
      return null;
  }

}

export {SpotifyDetailsComponent};
