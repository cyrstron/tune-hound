import { DeezerAction, ConnectDeezerFailureAction } from "./actions";
import {
  getDeezerConnectedState, 
  getFlashIgnoredState,
  getIsFlashEnabled
} from "./services/helpers";
import {
  SET_DEEZER_IS_CONNECTED,
  CONNECT_DEEZER_PENDING,
  CONNECT_DEEZER_FAILURE,
  CONNECT_DEEZER_SUCCESS,
} from './consts';

export interface DeezerState {
  wasConnected: boolean;
  isConnected: boolean;
  isFlashMsgIgnored: boolean;
  isFlashEnabled: boolean;
  error?: Error;
  isPending: boolean;
}

const initialDeezerState: DeezerState = {
  wasConnected: getDeezerConnectedState(),
  isConnected: false,
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
    default:
      return state;
  }
}
