import {
  INIT_AUDIO_PLAYER,
  SET_CURRENT_AUDIO_URL,
  SET_IS_AUDIO_PLAYING,
  SET_AUDIO_PENDING,
  SET_AUDIO_WAITING,
  SET_AUDIO_TIME,
  SET_AUDIO_VOLUME,
  SET_AUDIO_ERROR,
  SET_AUDIO_MOUNTED,
  SET_AUDIO_PROGRESS,
} from './consts';

export interface InitAudioAction {
  type: typeof INIT_AUDIO_PLAYER;
}

export const initAudio = (): InitAudioAction => ({
  type: INIT_AUDIO_PLAYER,
});

export interface SetAudioUrlAction {
  type: typeof SET_CURRENT_AUDIO_URL;
  payload: {
    url: string | null;
  };
}

export const setAudioUrl = (
  url: string | null,
): SetAudioUrlAction => ({
  type: SET_CURRENT_AUDIO_URL,
  payload: {url},
});

export interface SetAudioIsPlayingAction {
  type: typeof SET_IS_AUDIO_PLAYING;
  payload: {
    isPlaying: boolean;
  };
}

export const setAudioIsPlaying = (
  isPlaying: boolean,
): SetAudioIsPlayingAction => ({
  type: SET_IS_AUDIO_PLAYING,
  payload: {isPlaying},
});

export interface SetAudioIsPendingAction {
  type: typeof SET_AUDIO_PENDING;
  payload: {
    isPending: boolean;
  };
}

export const setAudioIsPending = (
  isPending: boolean,
): SetAudioIsPendingAction => ({
  type: SET_AUDIO_PENDING,
  payload: {isPending},
});

export interface SetAudioCurrentTimeAction {
  type: typeof SET_AUDIO_TIME;
  payload: {time: number};
}

export const setAudioCurrentTime = (
  time: number,
): SetAudioCurrentTimeAction => ({
  type: SET_AUDIO_TIME,
  payload: {time},
});

export interface SetAudioProgressAction {
  type: typeof SET_AUDIO_PROGRESS;
  payload: {buffered: [number, number][]};
}

export const setAudioProgress = (
  buffered: [number, number][],
): SetAudioProgressAction => ({
  type: SET_AUDIO_PROGRESS,
  payload: {buffered},
});


export interface SetAudioVolumeAction {
  type: typeof SET_AUDIO_VOLUME;
  payload: {volume: number};
}

export const setAudioVolume = (
  volume: number,
): SetAudioVolumeAction => ({
  type: SET_AUDIO_VOLUME,
  payload: {volume},
});

export interface SetAudioIsWaitingAction {
  type: typeof SET_AUDIO_WAITING;
}

export const setAudioIsWaiting = (): SetAudioIsWaitingAction => ({
  type: SET_AUDIO_WAITING,
});

export interface SetAudioErrorAction {
  type: typeof SET_AUDIO_ERROR;
  payload: {
    error: Error;
  };
}

export const setAudioError = (
  error: Error,
): SetAudioErrorAction => ({
  type: SET_AUDIO_ERROR,
  payload: {error},
});

export interface SetAudioMountedAction {
  type: typeof SET_AUDIO_MOUNTED;
}

export const setAudioMounted = (): SetAudioMountedAction => ({
  type: SET_AUDIO_MOUNTED,
});

export type AudioAction = SetAudioIsWaitingAction
  | SetAudioIsPendingAction
  | SetAudioCurrentTimeAction
  | SetAudioIsPlayingAction
  | SetAudioUrlAction
  | SetAudioErrorAction
  | SetAudioMountedAction
  | SetAudioVolumeAction
  | SetAudioProgressAction
  | InitAudioAction;
