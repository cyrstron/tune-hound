import { createContext } from 'react';

export {SpotifyProvider} from './spotify-provider';
export {withSpotify} from './hocs/with-spotify';

export const spotifyCtx = createContext<SpotifyCtx | undefined>(undefined);
export const SpotifyCtxProvider = spotifyCtx.Provider;
export const SpotifyCtxConsumer = spotifyCtx.Consumer;

export interface SpotifyCtx {
  connectSpotify: () => Promise<void>;
  disconnectSpotify: () => void;
  spotifyPlayer?: Spotify.SpotifyPlayer;
  isSpotifyPending: boolean;
}