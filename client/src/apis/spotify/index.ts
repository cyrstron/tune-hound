import { createContext } from 'react';

export {SpotifyProvider} from './spotify-provider';

export const SpotifyCtx = createContext<Spotify.SpotifyPlayer | undefined>(undefined);
export const SpotifyCtxProvider = SpotifyCtx.Provider;
export const SpotifyCtxConsumer = SpotifyCtx.Consumer;
