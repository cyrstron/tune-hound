import {
  SET_DEEZER_IS_CONNECTED, 
  CONNECT_DEEZER,
  DISCONNECT_DEEZER,
  CONNECT_DEEZER_PENDING,
  CONNECT_DEEZER_FAILURE,
  CONNECT_DEEZER_SUCCESS,
  SET_DEEZER_PLAYER_READY,
} from './consts';

export interface SetDeezerIsConnectedAction {
  type: typeof SET_DEEZER_IS_CONNECTED;
  payload: {
    isConnected: boolean;
  }
}

export const setDeezerIsConnected = (isConnected: boolean): SetDeezerIsConnectedAction => ({
  type: SET_DEEZER_IS_CONNECTED,
  payload: {isConnected},
});

export interface ConnectDeezerAction {
  type: typeof CONNECT_DEEZER;
}

export const connectDeezer = (): ConnectDeezerAction => ({
  type: CONNECT_DEEZER,
});

export interface DisconnectDeezerAction {
  type: typeof DISCONNECT_DEEZER;
}

export const disconnectDeezer = (): DisconnectDeezerAction => ({
  type: DISCONNECT_DEEZER,
});

export interface ConnectDeezerPendingAction {
  type: typeof CONNECT_DEEZER_PENDING;
}

export const connectDeezerPending = (): ConnectDeezerPendingAction => ({
  type: CONNECT_DEEZER_PENDING,
});

export interface ConnectDeezerFailureAction {
  type: typeof CONNECT_DEEZER_FAILURE;
  payload: {
    error: Error;
  };
}

export const connectDeezerFailure = (error: Error): ConnectDeezerFailureAction => ({
  type: CONNECT_DEEZER_FAILURE,
  payload: {error},
});

export interface ConnectDeezerSuccessAction {
  type: typeof CONNECT_DEEZER_SUCCESS;
}

export const connectDeezerSuccess = (): ConnectDeezerSuccessAction => ({
  type: CONNECT_DEEZER_SUCCESS,
});

export interface SetDeezerPlayerReadyAction {
  type: typeof SET_DEEZER_PLAYER_READY;
}

export const setDeezerPlayerReady = (): SetDeezerPlayerReadyAction => ({
  type: SET_DEEZER_PLAYER_READY,
});

export type DeezerAction = SetDeezerIsConnectedAction
  | ConnectDeezerAction
  | ConnectDeezerPendingAction
  | ConnectDeezerFailureAction
  | ConnectDeezerSuccessAction
  | SetDeezerPlayerReadyAction;
