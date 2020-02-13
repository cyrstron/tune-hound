import { SpotifyAction } from "./actions";
import { 
  SpotifyAuthData, 
  getSpotifyPlayerMsgState, 
  getSpotifyAuthState,
} from "./services/helpers";

export interface SpotifyState {
  isPlayerMsgIgnored: boolean;
  authData?: SpotifyAuthData;
}

const initialSpotifyState: SpotifyState = {
  isPlayerMsgIgnored: getSpotifyPlayerMsgState(),
  authData: getSpotifyAuthState(),
};

export function spotifyReducer(
  state: SpotifyState = initialSpotifyState,
  {type, payload}: SpotifyAction,
) {
  switch(type) {
    default:
      return state;
  }
}