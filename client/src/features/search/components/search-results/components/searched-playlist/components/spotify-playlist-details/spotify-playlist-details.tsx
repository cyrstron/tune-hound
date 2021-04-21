import React, { FC } from 'react';
import { SpotifyPlaylistSourceItemShort } from '@app/features/search/state/types';

export interface SpotifyPlaylistDetailsProps {
  playlist: SpotifyPlaylistSourceItemShort;
}

const SpotifyPlaylistDetailsComponent: FC<SpotifyPlaylistDetailsProps> = ({ playlist }) => {
  return <div>{playlist.name}</div>;
};

export { SpotifyPlaylistDetailsComponent };
