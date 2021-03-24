export const SPOTIFY_ROOT = '@app/spotify' as const;

export const CONNECT_SPOTIFY = `${SPOTIFY_ROOT}/CONNECT_SPOTIFY` as const;

export const CONNECT_SPOTIFY_PENDING = `${CONNECT_SPOTIFY}:pending` as const;
export const CONNECT_SPOTIFY_FAILURE = `${CONNECT_SPOTIFY}:failure` as const;
export const CONNECT_SPOTIFY_SUCCESS = `${CONNECT_SPOTIFY}:success` as const;

export const DISCONNECT_SPOTIFY = `${SPOTIFY_ROOT}/DISCONNECT_SPOTIFY` as const;

export const SET_SPOTIFY_PLAYER_STATE = `${SPOTIFY_ROOT}/SET_SPOTIFY_PLAYER_STATE` as const;
export const SET_SPOTIFY_PLAYER_ERROR = `${SPOTIFY_ROOT}/SET_SPOTIFY_PLAYER_ERROR` as const;
export const SET_SPOTIFY_PLAYER_READY = '@app/spotify/SET_SPOTIFY_PLAYER_READY';
export const SET_SPOTIFY_AUTH_DATA = '@app/spotify/SET_SPOTIFY_AUTH_DATA';

export const UPDATE_SPOTIFY_ACCESS_TOKEN = `@app/spotify/UPDATE_SPOTIFY_ACCESS_TOKEN`;
export const UPDATE_SPOTIFY_ACCESS_TOKEN_PENDING = `@app/spotify/UPDATE_SPOTIFY_ACCESS_TOKEN:pending`;
export const UPDATE_SPOTIFY_ACCESS_TOKEN_SUCCESS =
  '@app/spotify/UPDATE_SPOTIFY_ACCESS_TOKEN:success';
export const UPDATE_SPOTIFY_ACCESS_TOKEN_FAILURE =
  '@app/spotify/UPDATE_SPOTIFY_ACCESS_TOKEN:failure';

export const SPOTIFY_MOUNTED = '@app/spotify/SPOTIFY_MOUNTED' as const;
export const SET_SPOTIFY_IS_CONNECTED = '@app/spotify/SET_SPOTIFY_IS_CONNECTED';

export const SET_SPOTIFY_ACTIVE_PLAYER_IGNORED = '@app/spotify/SET_SPOTIFY_ACTIVE_PLAYER_IGNORED';
export const SET_SPOTIFY_DISABLED = '@app/spotify/SET_SPOTIFY_DISABLED' as const;
export const SET_SPOTIFY_CURRENT_USER = '@app/spotify/SET_SPOTIFY_CURRENT_USER' as const;
export const SET_SPOTIFY_PLAYER_INITED = '@app/spotify/SET_SPOTIFY_PLAYER_INITED' as const;
