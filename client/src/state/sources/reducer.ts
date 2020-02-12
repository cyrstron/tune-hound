import { SourcesAction } from "./actions";
import { 
  SpotifyAuthData, 
  getDeezerConnectedState, 
  getFlashIgnoredState, 
  getSpotifyPlayerMsgState, 
  getSpotifyAuthState 
} from "./helpers";

export interface SourcesState {
  isDeezerConnected: boolean;
  isFlashMsgIgnored: boolean;
  isSpotifyPlayerMsgIgnored: boolean;
  spotifyAuthData?: SpotifyAuthData;
}

const initialAuthState: SourcesState = {
  isDeezerConnected: getDeezerConnectedState(),
  isFlashMsgIgnored: getFlashIgnoredState(),
  isSpotifyPlayerMsgIgnored: getSpotifyPlayerMsgState(),
  spotifyAuthData: getSpotifyAuthState(),
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