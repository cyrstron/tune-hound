import {
  SpotifyAction,
  SetSpotifyAuthDataAction,
  UpdateSpotifyAccessTokenSuccessAction,
  SetSpotifyCurrentUserAction,
  UpdateSpotifyAccessTokenFailureAction,
  ConnectSpotifyFailureAction,
  SetSpotifyPlayerStateAction,
  SetSpotifyPlayerErrorAction,
  SetSpotifyPlayerReadyAction,
  SetSpotifyPlayerInitedAction,
  SetSpotifyActivePlayerIgnoredAction,
} from './actions';
import { SpotifyAuthData, getSpotifyPlayerMsgState, getSpotifyAuthState } from './services/helpers';
import {
  CONNECT_SPOTIFY_PENDING,
  CONNECT_SPOTIFY_FAILURE,
  CONNECT_SPOTIFY_SUCCESS,
  SET_SPOTIFY_PLAYER_STATE,
  SET_SPOTIFY_PLAYER_READY,
  SET_SPOTIFY_AUTH_DATA,
  UPDATE_SPOTIFY_ACCESS_TOKEN_SUCCESS,
  UPDATE_SPOTIFY_ACCESS_TOKEN_FAILURE,
  SPOTIFY_MOUNTED,
  SET_SPOTIFY_PLAYER_INITED,
  DISCONNECT_SPOTIFY,
  SET_SPOTIFY_CURRENT_USER,
  SET_SPOTIFY_PLAYER_ERROR,
  SET_SPOTIFY_ACTIVE_PLAYER_IGNORED,
} from './consts';

export interface SpotifyState {
  isPlayerMsgIgnored: boolean;
  isConnected: boolean;
  wasConnected: boolean;
  isPending: boolean;
  isDisabled: boolean;
  isMounted: boolean;
  authData?: SpotifyAuthData;
  error?: Error;
  playbackState?: Spotify.PlaybackState | null;
  playbackError?: Spotify.Error;
  playbackInstance?: Spotify.WebPlaybackInstance;
  isPlayerInited: boolean;
  isPlaybackReady: boolean;
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
  isPlaybackReady: false,
  isPlayerInited: false,
};

export function spotifyReducer(
  state: SpotifyState = initialSpotifyState,
  action: SpotifyAction,
): SpotifyState {
  switch (action.type) {
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
    case DISCONNECT_SPOTIFY:
      return {
        ...state,
        isConnected: false,
        authData: undefined,
        playbackState: undefined,
        playbackError: undefined,
        playbackInstance: undefined,
        isPlaybackReady: false,
        currentUser: undefined,
      };
    case SET_SPOTIFY_AUTH_DATA:
      return {
        ...state,
        authData: (action as SetSpotifyAuthDataAction).payload.authData,
      };
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
        error: (action as UpdateSpotifyAccessTokenFailureAction).payload.error,
      };
    case SET_SPOTIFY_CURRENT_USER:
      return {
        ...state,
        currentUser: (action as SetSpotifyCurrentUserAction).payload.user,
      };
    case SPOTIFY_MOUNTED:
      return {
        ...state,
        isMounted: true,
      };
    case SET_SPOTIFY_PLAYER_STATE:
      return {
        ...state,
        playbackState: (action as SetSpotifyPlayerStateAction).payload.state,
      };
    case SET_SPOTIFY_PLAYER_ERROR:
      return {
        ...state,
        playbackError: (action as SetSpotifyPlayerErrorAction).payload.error,
      };
    case SET_SPOTIFY_PLAYER_READY:
      return {
        ...state,
        playbackInstance: (action as SetSpotifyPlayerReadyAction).payload.instance,
        isPlaybackReady: (action as SetSpotifyPlayerReadyAction).payload.isReady,
      };
    case SET_SPOTIFY_PLAYER_INITED:
      return {
        ...state,
        isPlayerInited: (action as SetSpotifyPlayerInitedAction).payload.isInited,
      };
    case SET_SPOTIFY_ACTIVE_PLAYER_IGNORED:
      return {
        ...state,
        isPlayerMsgIgnored: (action as SetSpotifyActivePlayerIgnoredAction).payload.isIgnored,
      };
    default:
      return state;
  }
}
