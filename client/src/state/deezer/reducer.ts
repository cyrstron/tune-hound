import {
  getDeezerConnectedState,
  getFlashIgnoredState,
  getIsFlashEnabled,
  getDeezerDisabledState,
} from './services/helpers';
import {
  SET_DEEZER_IS_CONNECTED,
  DISCONNECT_DEEZER,
  CONNECT_DEEZER_PENDING,
  CONNECT_DEEZER_FAILURE,
  CONNECT_DEEZER_SUCCESS,
  SET_DEEZER_DISABLED,
  SET_FLASH_IGNORED,
  DEEZER_MOUNTED,
  DEEZER_INITED,
  SET_DEEZER_CURRENT_USER,
  SET_IS_PLAYING,
  DEEZER_VOLUME_CHANGED,
  SET_PLAYING_TRACK,
  SET_IS_PLAYER_NOT_MUTED,
  SET_PLAYER_BUFFERING,
  SET_PLAYER_POSITION,
  SET_REPEAT_MODE,
  SET_PLAYER_SHUFFLE,
  DEEZER_TRACK_LIST_CHANGED,
} from './consts';
import { DeezerUser } from './types';
import { AppAction } from '../actions';

export interface DeezerState {
  isMounted: boolean;
  isInited: boolean;
  isDisabled: boolean;
  wasConnected: boolean;
  isConnected: boolean;
  isFlashMsgIgnored: boolean;
  isFlashEnabled: boolean;
  volume: number;
  error?: Error;
  isPending: boolean;
  currentUser?: DeezerUser;
  isPlaying: boolean;
  playingTrack: DeezerSdk.Track | null;
  playingTrackIndex: number | null;
  trackList: DeezerSdk.Track[];
  isNotMuted: boolean;
  repeatMode: DeezerSdk.RepeatMode;
  buffered?: number;
  position?: [number, number];
  isShuffled: boolean;
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
  isPlaying: false,
  volume: 0,
  playingTrack: null,
  playingTrackIndex: null,
  trackList: [],
  isNotMuted: true,
  repeatMode: 0,
  isShuffled: false,
};

export function deezerReducer(
  state: DeezerState = initialDeezerState,
  action: AppAction,
): DeezerState {
  switch (action.type) {
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
    case DISCONNECT_DEEZER:
      return {
        ...state,
        wasConnected: false,
        isConnected: false,
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
      };
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
    case SET_IS_PLAYING:
      return {
        ...state,
        isPlaying: action.payload.isPlaying,
      };
    case SET_DEEZER_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload.user,
      };
    case DEEZER_VOLUME_CHANGED:
      return {
        ...state,
        volume: action.payload.volume,
      };
    case SET_PLAYING_TRACK:
      return {
        ...state,
        playingTrack: action.payload.track,
        playingTrackIndex: action.payload.index,
      };
    case SET_IS_PLAYER_NOT_MUTED:
      return {
        ...state,
        isNotMuted: action.payload.isNotMuted,
      };
    case SET_PLAYER_BUFFERING:
      return {
        ...state,
        buffered: action.payload.buffered,
      };
    case SET_PLAYER_POSITION:
      return {
        ...state,
        position: action.payload.position,
      };
    case SET_REPEAT_MODE:
      return {
        ...state,
        repeatMode: action.payload.repeatMode,
      };
    case SET_PLAYER_SHUFFLE:
      return {
        ...state,
        isShuffled: action.payload.isShuffled,
      };
    case DEEZER_TRACK_LIST_CHANGED:
      return {
        ...state,
        trackList: action.payload.tracks,
      };
    default:
      return state;
  }
}
