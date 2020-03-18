import React, {FC} from 'react';
import { SpotifyTrackDetails } from './components/spotify-track-details';

export interface SpotifyDetailsProps {
  object: SpotifyApi.TrackObjectFull | 
    SpotifyApi.AlbumObjectSimplified | 
    SpotifyApi.ArtistObjectFull | 
    SpotifyApi.PlaylistObjectSimplified;
}

const SpotifyDetailsComponent: FC<SpotifyDetailsProps> = ({object}) => {
  switch(object.type) {
    case 'track':
      return <SpotifyTrackDetails track={object} />
    default:
      return null;
  }

}

export {SpotifyDetailsComponent};
