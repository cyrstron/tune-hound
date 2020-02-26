import {
  SET_DEEZER_IS_CONNECTED, 
  CONNECT_DEEZER,
  DISCONNECT_DEEZER,
  CONNECT_DEEZER_PENDING,
  CONNECT_DEEZER_FAILURE,
  CONNECT_DEEZER_SUCCESS,
  SET_FLASH_IGNORED,
  SET_DEEZER_DISABLED,
  DEEZER_MOUNTED,
  DEEZER_INITED,
  SET_DEEZER_CURRENT_USER,
} from './consts';
import { DeezerUser } from './types';

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

export interface SetFlashIgnoredAction {
  type: typeof SET_FLASH_IGNORED;
  payload: {isIgnored: boolean};
}

export const setFlashIgnored = (isIgnored: boolean): SetFlashIgnoredAction => ({
  type: SET_FLASH_IGNORED,
  payload: {isIgnored},
});

export interface SetDeezerDisabledAction {
  type: typeof SET_DEEZER_DISABLED;
  payload: {isDisabled: boolean};
}

export const setDeezerDisabled = (isDisabled: boolean): SetDeezerDisabledAction => ({
  type: SET_DEEZER_DISABLED,
  payload: {isDisabled},
});

export interface SetDeezerMountedAction {
  type: typeof DEEZER_MOUNTED;
}

export const setDeezerMounted = (): SetDeezerMountedAction => ({
  type: DEEZER_MOUNTED,
});

export interface SetDeezerInitedAction {
  type: typeof DEEZER_INITED;
}

export const setDeezerInited = (): SetDeezerInitedAction => ({
  type: DEEZER_INITED,
});

export interface SetDeezerCurrentUserAction {
  type: typeof SET_DEEZER_CURRENT_USER;
  payload: {user: DeezerUser}
}

export const setDeezerCurrentUser = (user: DeezerUser): SetDeezerCurrentUserAction => ({
  type: SET_DEEZER_CURRENT_USER,
  payload: {user}
});

export type DeezerAction = SetDeezerIsConnectedAction
  | ConnectDeezerAction
  | ConnectDeezerPendingAction
  | ConnectDeezerFailureAction
  | ConnectDeezerSuccessAction
  | DisconnectDeezerAction
  | SetFlashIgnoredAction
  | SetDeezerDisabledAction
  | SetDeezerMountedAction
  | SetDeezerInitedAction
  | SetDeezerCurrentUserAction;
