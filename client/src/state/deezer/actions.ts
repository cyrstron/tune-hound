import {
  SET_DEEZER_DISCONNECTED, 
  CONNECT_DEEZER,
  CONNECT_DEEZER_PENDING,
  CONNECT_DEEZER_FAILURE,
  CONNECT_DEEZER_SUCCESS,
} from './consts';

export interface SetDeezerDisconnectedAction {
  type: typeof SET_DEEZER_DISCONNECTED;
}

export const setDeezerDisconnected = (): SetDeezerDisconnectedAction => ({
  type: SET_DEEZER_DISCONNECTED,
});

export interface ConnectDeezerAction {
  type: typeof CONNECT_DEEZER;
}

export const connectDeezer = (isConnected: boolean): ConnectDeezerAction => ({
  type: CONNECT_DEEZER,
});

export interface ConnectDeezerPending {
  type: typeof CONNECT_DEEZER_PENDING;
}

export const connectDeezerPending = (): ConnectDeezerPending => ({
  type: CONNECT_DEEZER_PENDING,
});

export interface ConnectDeezerFailure {
  type: typeof CONNECT_DEEZER_FAILURE;
  payload: {
    error: Error;
  };
}

export const connectDeezerFailure = (error: Error): ConnectDeezerFailure => ({
  type: CONNECT_DEEZER_FAILURE,
  payload: {error},
});

export interface ConnectDeezerSuccess {
  type: typeof CONNECT_DEEZER_SUCCESS;
}

export const connectDeezerSuccess = (): ConnectDeezerSuccess => ({
  type: CONNECT_DEEZER_SUCCESS,
});

export type DeezerAction = SetDeezerDisconnectedAction
  | ConnectDeezerAction
  | ConnectDeezerPending
  | ConnectDeezerFailure
  | ConnectDeezerSuccess;
