import { createContext } from 'react';
import { SpotifyService } from './services/spotify-service';

export {SpotifyProvider} from './spotify-provider';
export {withSpotify} from './hocs/with-spotify';

export const spotifyCtx = createContext<SpotifyCtx | undefined>(undefined);
export const SpotifyCtxProvider = spotifyCtx.Provider;
export const SpotifyCtxConsumer = spotifyCtx.Consumer;

export interface SpotifyCtx {
  connectSpotify: () => Promise<void>;
  disconnectSpotify: () => void;
  spotifyService?: SpotifyService;
  isSpotifyPending: boolean;
}

declare global { 
  namespace SpotifyApi {
    interface RestrictionError {
      error: {
        status: number;
        message: string;
        reason: string;
      }
    }
  }
}