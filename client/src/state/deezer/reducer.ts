import { DeezerAction } from "./actions";
import {
  getDeezerConnectedState, 
  getFlashIgnoredState,
  getIsFlashEnabled,
  getDeezerDisabledState
} from "./services/helpers";
import {
  SET_DEEZER_IS_CONNECTED,
  CONNECT_DEEZER_PENDING,
  CONNECT_DEEZER_FAILURE,
  CONNECT_DEEZER_SUCCESS,
  SET_DEEZER_PLAYER_READY,
} from './consts';

export interface DeezerState {
  isMounted: boolean;
  isDisabled: boolean;
  wasConnected: boolean;
  isConnected: boolean;
  isPlayerReady: boolean;
  isFlashMsgIgnored: boolean;
  isFlashEnabled: boolean;
  error?: Error;
  isPending: boolean;
}

const initialDeezerState: DeezerState = {
  isDisabled: getDeezerDisabledState(),
  isMounted: false,
  wasConnected: getDeezerConnectedState(),
  isConnected: false,
  isPlayerReady: false,
  isFlashMsgIgnored: getFlashIgnoredState(),
  isFlashEnabled: getIsFlashEnabled(),
  isPending: false,
};

export function deezerReducer(
  state: DeezerState = initialDeezerState,
  action: DeezerAction,
) {
  switch(action.type) {
    case SET_DEEZER_IS_CONNECTED:
      return {
        ...state,
        isConnected: action.payload.isConnected,
      };
    case CONNECT_DEEZER_PENDING:
      return {
        ...state,
        isPending: true,
      };
    case CONNECT_DEEZER_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isPending: false,
        isConnected: false,
      };
    case CONNECT_DEEZER_SUCCESS:
      return {
        ...state,
        error: undefined,
        isConnected: true,
        isPending: false,
      };
    case SET_DEEZER_PLAYER_READY:
      return {
        ...state,
        isPlayerReady: true,
      };
    default:
      return state;
  }
}
