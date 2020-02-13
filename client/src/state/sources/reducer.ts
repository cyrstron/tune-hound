import { SourcesAction } from "./actions";
import { 
  SpotifyAuthData, 
  getDeezerConnectedState, 
  getFlashIgnoredState, 
  getSpotifyPlayerMsgState, 
  getSpotifyAuthState ,
  getIsFlashEnabled
} from "./helpers";

export interface SourcesState {
  deezer: {
    isConnected: boolean;
    isFlashMsgIgnored: boolean;
    isFlashEnabled: boolean;
    error?: Error;
    isPending: boolean;
  },
  spotify: {
    isPlayerMsgIgnored: boolean;
    authData?: SpotifyAuthData;
  }
}

const initialAuthState: SourcesState = {
  deezer: {
    isConnected: getDeezerConnectedState(),
    isFlashMsgIgnored: getFlashIgnoredState(),
    isFlashEnabled: getIsFlashEnabled(),
    isPending: false,
  },
  spotify: {
    isPlayerMsgIgnored: getSpotifyPlayerMsgState(),
    authData: getSpotifyAuthState(),
  },
};

export function sourcesReducer(
  state: SourcesState = initialAuthState,
  {type, payload}: SourcesAction,
) {
  switch(type) {
    default:
      return state;
  }
}