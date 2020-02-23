import { SpotifyAction, SetSpotifyAuthDataAction, UpdateSpotifyAccessTokenSuccessAction, SetSpotifyCurrentUserAction, UpdateSpotifyAccessTokenFailureAction, ConnectSpotifyFailureAction } from "./actions";
import { 
  SpotifyAuthData, 
  getSpotifyPlayerMsgState, 
  getSpotifyAuthState,
} from "./services/helpers";
import {
  CONNECT_SPOTIFY,
  CONNECT_SPOTIFY_PENDING,
  CONNECT_SPOTIFY_FAILURE,
  CONNECT_SPOTIFY_SUCCESS,
  SET_SPOTIFY_PLAYBACK_STATE,
  SET_SPOTIFY_PLAYER_READY,
  SET_SPOTIFY_NOT_PLAYER_READY,
  SET_SPOTIFY_AUTH_DATA,
  UPDATE_SPOTIFY_ACCESS_TOKEN,
  UPDATE_SPOTIFY_ACCESS_TOKEN_PENDING,
  UPDATE_SPOTIFY_ACCESS_TOKEN_SUCCESS,
  UPDATE_SPOTIFY_ACCESS_TOKEN_FAILURE,
  SPOTIFY_MOUNTED,
  SPOTIFY_INITED,
  SET_SPOTIFY_IS_CONNECTED,
  SET_SPOTIFY_CURRENT_USER,
} from './consts';

export interface SpotifyState {
  isPlayerMsgIgnored: boolean;
  isConnected: boolean;
  wasConnected: boolean;
  isPending: boolean;
  isDisabled: boolean;
  isMounted: boolean;
  authData?: SpotifyAuthData;
  deviceId?: string;
  error?: Error;
  playbackState?: Spotify.PlaybackState | null;
  playbackError?: Spotify.Error;
  currentUser?: SpotifyApi.CurrentUsersProfileResponse;
}

const authData = getSpotifyAuthState();

const initialSpotifyState: SpotifyState = {
  isPlayerMsgIgnored: getSpotifyPlayerMsgState(),
  authData,
  wasConnected: !!authData,
  isConnected: false,
  isDisabled: false,
  isPending: false,
  isMounted: false,
};

export function spotifyReducer(
  state: SpotifyState = initialSpotifyState,
  action: SpotifyAction,
): SpotifyState {
  switch(action.type) {
    case CONNECT_SPOTIFY_PENDING:
      return {
        ...state,
        isConnected: false,
        isPending: true,
        error: undefined,
      };
    case CONNECT_SPOTIFY_SUCCESS:
      return {
        ...state,
        isConnected: true,
        isPending: false,
      };
    case CONNECT_SPOTIFY_FAILURE:
      return {
        ...state,
        isPending: false,
        error: (action as ConnectSpotifyFailureAction).payload.error,
      };
    case SET_SPOTIFY_AUTH_DATA:
      return {
        ...state,
        authData: (action as SetSpotifyAuthDataAction).payload.authData,
      }
    case UPDATE_SPOTIFY_ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        authData: {
          ...state.authData!,
          accessToken: (action as UpdateSpotifyAccessTokenSuccessAction).payload.accessToken,
          expiresIn: (action as UpdateSpotifyAccessTokenSuccessAction).payload.expiresIn,
        },
      };
    case UPDATE_SPOTIFY_ACCESS_TOKEN_FAILURE:
      return {
        ...state,
        authData: undefined,
        error: (action as UpdateSpotifyAccessTokenFailureAction).payload.error
      };
    case SET_SPOTIFY_CURRENT_USER:
      return {
        ...state,
        currentUser: (action as SetSpotifyCurrentUserAction).payload.user,
      }
    case SPOTIFY_MOUNTED:
      return {
        ...state,
        isMounted: true,
      };
    default:
      return state;
  }
}