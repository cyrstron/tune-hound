import React, {FC} from 'react';

export interface SpotifyPlaylistDetailsProps {
  playlist: SpotifyApi.PlaylistObjectSimplified;
}

const SpotifyPlaylistDetailsComponent: FC<SpotifyPlaylistDetailsProps> = ({playlist}) => {
  return (
    <div>
      {playlist.name}
    </div>
  );
}

export {SpotifyPlaylistDetailsComponent}