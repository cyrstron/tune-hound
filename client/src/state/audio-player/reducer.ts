import { AppAction } from '../actions';
import {
  SET_CURRENT_AUDIO_URL,
  SET_IS_AUDIO_PLAYING,
  SET_AUDIO_PENDING,
  SET_AUDIO_WAITING,
  SET_AUDIO_TIME,
  SET_AUDIO_VOLUME,
  SET_AUDIO_ERROR,
  SET_AUDIO_MOUNTED,
} from './consts';

export interface AudioState {
  isMounted: boolean;
  volume: number;
  error?: Error;
  isPending: boolean;
  isPlaying: boolean;
  buffered?: number;
  currentTime?: number;
  currentUrl: string | null;
}

const initialDeezerState: AudioState = {
  isMounted: false,
  volume: 0.5,
  isPending: false,
  isPlaying: false,
  currentUrl: null,
};

export function audioReducer(
  state: AudioState = initialDeezerState,
  action: AppAction,
): AudioState {
  switch (action.type) {
    case SET_CURRENT_AUDIO_URL:
      return {
        ...state,
        currentUrl: action.payload.url,
      };
    case SET_IS_AUDIO_PLAYING:
      return {
        ...state,
        isPlaying: action.payload.isPlaying,
        isPending: action.payload.isPlaying ? false : state.isPending,
      };
    case SET_AUDIO_PENDING:
      return {
        ...state,
        isPending: action.payload.isPending,
      };
    case SET_AUDIO_WAITING:
      return {
        ...state,
        isPlaying: false,
        isPending: true,
      };
    case SET_AUDIO_TIME:
      return {
        ...state,
        currentTime: action.payload.time,
      };
    case SET_AUDIO_VOLUME:
      return {
        ...state,
        volume: action.payload.volume,
      };
    case SET_AUDIO_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    case SET_AUDIO_MOUNTED:
      return {
        ...state,
        isMounted: true,
      };
    default:
      return state;
  }
}
