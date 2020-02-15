import { 
  DeezerAction, 
  SetDeezerIsConnectedAction, 
  ConnectDeezerFailureAction,
  SetDeezerCurrentUserAction,
} from "./actions";
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
  SET_DEEZER_DISABLED,
  SET_FLASH_IGNORED,
  DEEZER_MOUNTED,
  DEEZER_INITED,
  SET_DEEZER_CURRENT_USER,
} from './consts';
import { DeezerUser } from "./types";

export interface DeezerState {
  isMounted: boolean;
  isInited: boolean;
  isDisabled: boolean;
  wasConnected: boolean;
  isConnected: boolean;
  isFlashMsgIgnored: boolean;
  isFlashEnabled: boolean;
  error?: Error;
  isPending: boolean;
  currentUser?: DeezerUser;
}

const initialDeezerState: DeezerState = {
  isDisabled: getDeezerDisabledState(),
  isMounted: false,
  isInited: false,
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
        isConnected: (action as SetDeezerIsConnectedAction).payload.isConnected,
      };
    case CONNECT_DEEZER_PENDING:
      return {
        ...state,
        isPending: true,
      };
    case CONNECT_DEEZER_FAILURE:
      return {
        ...state,
        error: (action as ConnectDeezerFailureAction).payload.error,
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
    case SET_DEEZER_DISABLED:
      return {
        ...state,
        isDisabled: false,
      };
    case SET_FLASH_IGNORED:
      return {
        ...state,
        isFlashMsgIgnored: true,
      }
    case DEEZER_MOUNTED:
      return {
        ...state,
        isMounted: true,
      };
    case DEEZER_INITED:
      return {
        ...state,
        isInited: true,
      };
    case SET_DEEZER_CURRENT_USER:
      return {
        ...state,
        currentUser: (action as SetDeezerCurrentUserAction).payload.user,
      };
    default:
      return state;
  }
}
