import {
  CONNECT_SPOTIFY,
  CONNECT_SPOTIFY_PENDING,
  CONNECT_SPOTIFY_FAILURE,
  CONNECT_SPOTIFY_SUCCESS,
  DISCONNECT_SPOTIFY,
  SET_SPOTIFY_PLAYER_STATE,
  SET_SPOTIFY_PLAYER_READY,
  SET_SPOTIFY_PLAYER_ERROR,
  SET_SPOTIFY_AUTH_DATA,
  UPDATE_SPOTIFY_ACCESS_TOKEN,
  UPDATE_SPOTIFY_ACCESS_TOKEN_PENDING,
  UPDATE_SPOTIFY_ACCESS_TOKEN_SUCCESS,
  UPDATE_SPOTIFY_ACCESS_TOKEN_FAILURE,
  SPOTIFY_MOUNTED,
  SET_SPOTIFY_PLAYER_INITED,
  SET_SPOTIFY_ACTIVE_PLAYER_IGNORED,
  SET_SPOTIFY_CURRENT_USER,
} from './consts';
import { SpotifyAuthData } from './services/helpers';

export interface ConnectSpotifyAction {
  type: typeof CONNECT_SPOTIFY;
}

export const connectSpotify = (): ConnectSpotifyAction => ({
  type: CONNECT_SPOTIFY,
});

export interface ConnectSpotifyPendingAction {
  type: typeof CONNECT_SPOTIFY_PENDING;
}

export const connectSpotifyPending = (): ConnectSpotifyPendingAction => ({
  type: CONNECT_SPOTIFY_PENDING,
});

export interface ConnectSpotifyFailureAction {
  type: typeof CONNECT_SPOTIFY_FAILURE;
  payload: {
    error: Error;
  };
}

export const connectSpotifyFailure = (error: Error): ConnectSpotifyFailureAction => ({
  type: CONNECT_SPOTIFY_FAILURE,
  payload: {error},
});

export interface ConnectSpotifySuccessAction {
  type: typeof CONNECT_SPOTIFY_SUCCESS;
}

export const connectSpotifySuccess = (): ConnectSpotifySuccessAction => ({
  type: CONNECT_SPOTIFY_SUCCESS,
});

export interface DisconnectSpotifyAction {
  type: typeof DISCONNECT_SPOTIFY;
}

export const disconnectSpotify = (): DisconnectSpotifyAction => ({
  type: DISCONNECT_SPOTIFY,
});

export interface SpotifyMountedAction {
  type: typeof SPOTIFY_MOUNTED;
}

export const spotifyMounted = (): SpotifyMountedAction => ({
  type: SPOTIFY_MOUNTED,
});

export interface SetSpotifyAuthDataAction {
  type: typeof SET_SPOTIFY_AUTH_DATA;
  payload: {
    authData: SpotifyAuthData;
  }
}

export const setSpotifyAuthData = (authData: SpotifyAuthData): SetSpotifyAuthDataAction => ({
  type: SET_SPOTIFY_AUTH_DATA,
  payload: {authData},
});

export interface UpdateSpotifyAccessTokenAction {
  type: typeof UPDATE_SPOTIFY_ACCESS_TOKEN;
}

export const updateSpotifyAccessToken = (): UpdateSpotifyAccessTokenAction => ({
  type: UPDATE_SPOTIFY_ACCESS_TOKEN,
});


export interface UpdateSpotifyAccessTokenPendingAction {
  type: typeof UPDATE_SPOTIFY_ACCESS_TOKEN_PENDING;
}

export const updateSpotifyAccessTokenPending = (): UpdateSpotifyAccessTokenPendingAction => ({
  type: UPDATE_SPOTIFY_ACCESS_TOKEN_PENDING,
});

export interface UpdateSpotifyAccessTokenSuccessAction {
  type: typeof UPDATE_SPOTIFY_ACCESS_TOKEN_SUCCESS;
  payload: {
    accessToken: string;
    expiresIn: Date;
  }
}

export const updateSpotifyAccessTokenSuccess = (
  accessToken: string,
  expiresIn: Date,
): UpdateSpotifyAccessTokenSuccessAction => ({
  type: UPDATE_SPOTIFY_ACCESS_TOKEN_SUCCESS,
  payload: {accessToken, expiresIn},
});

export interface UpdateSpotifyAccessTokenFailureAction {
  type: typeof UPDATE_SPOTIFY_ACCESS_TOKEN_FAILURE;
  payload: {
    error: Error,
  }
}

export const updateSpotifyAccessTokenFailure = (error: Error): UpdateSpotifyAccessTokenFailureAction => ({
  type: UPDATE_SPOTIFY_ACCESS_TOKEN_FAILURE,
  payload: {error},
});

export interface SetSpotifyPlayerReadyAction {
  type: typeof SET_SPOTIFY_PLAYER_READY;
  payload: {
    instance: Spotify.WebPlaybackInstance;
    isReady: boolean;
  }
}

export const setSpotifyPlayerReady = (
  instance: Spotify.WebPlaybackInstance,
  isReady: boolean,
): SetSpotifyPlayerReadyAction => ({
  type: SET_SPOTIFY_PLAYER_READY,
  payload: {instance, isReady},
});

export interface SetSpotifyPlayerStateAction {
  type: typeof SET_SPOTIFY_PLAYER_STATE;
  payload: {
    state: Spotify.PlaybackState | null;
  }
}

export const setSpotifyPlayerState = (
  state: Spotify.PlaybackState | null,
): SetSpotifyPlayerStateAction => ({
  type: SET_SPOTIFY_PLAYER_STATE,
  payload: {state},
});

export interface SetSpotifyPlayerErrorAction {
  type: typeof SET_SPOTIFY_PLAYER_ERROR;
  payload: {
    error: Spotify.Error;
  }
}

export const setSpotifyPlayerError = (
  error: Spotify.Error,
): SetSpotifyPlayerErrorAction => ({
  type: SET_SPOTIFY_PLAYER_ERROR,
  payload: {error},
});

export interface SetSpotifyCurrentUserAction {
  type: typeof SET_SPOTIFY_CURRENT_USER;
  payload: {
    user: SpotifyApi.CurrentUsersProfileResponse;
  }
}

export const setSpotifyCurrentUser = (
  user: SpotifyApi.CurrentUsersProfileResponse,
): SetSpotifyCurrentUserAction => ({
  type: SET_SPOTIFY_CURRENT_USER,
  payload: {user},
});

export interface SetSpotifyPlayerInitedAction {
  type: typeof SET_SPOTIFY_PLAYER_INITED;
  payload: {
    isInited: boolean;
  }
}

export const setSpotifyPlayerInited = (
  isInited: boolean
): SetSpotifyPlayerInitedAction => ({
  type: SET_SPOTIFY_PLAYER_INITED,
  payload: {isInited}
});


export interface SetSpotifyActivePlayerIgnoredAction {
  type: typeof SET_SPOTIFY_ACTIVE_PLAYER_IGNORED;
  payload: {
    isIgnored: boolean;
  }
};

export const setSpotifyActivePlayerIgnored = (
  isIgnored: boolean,
): SetSpotifyActivePlayerIgnoredAction => ({
  type: SET_SPOTIFY_ACTIVE_PLAYER_IGNORED,
  payload: {isIgnored},
});

export type SpotifyAction = ConnectSpotifyAction
  | ConnectSpotifyPendingAction
  | ConnectSpotifyFailureAction
  | ConnectSpotifySuccessAction
  | DisconnectSpotifyAction
  | SpotifyMountedAction
  | SetSpotifyAuthDataAction
  | UpdateSpotifyAccessTokenAction
  | UpdateSpotifyAccessTokenPendingAction
  | UpdateSpotifyAccessTokenSuccessAction
  | UpdateSpotifyAccessTokenFailureAction
  | SetSpotifyCurrentUserAction
  | SetSpotifyPlayerReadyAction
  | SetSpotifyPlayerStateAction
  | SetSpotifyPlayerErrorAction
  | SetSpotifyPlayerInitedAction
  | SetSpotifyActivePlayerIgnoredAction
  | ConnectSpotifyPendingAction;
