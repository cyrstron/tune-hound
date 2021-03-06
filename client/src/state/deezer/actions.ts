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
  SET_IS_PLAYING,
  SET_PLAYING_TRACK,
  SET_IS_PLAYER_NOT_MUTED,
  SET_PLAYER_BUFFERING,
  SET_PLAYER_LOADED,
  SET_PLAYER_POSITION,
  SET_REPEAT_MODE,
  SET_PLAYER_SHUFFLE,
  DEEZER_TRACK_END,
  DEEZER_TRACK_LIST_CHANGED,
  DEEZER_VOLUME_CHANGED,
} from './consts';
import { DeezerUser } from './types';

export interface SetDeezerIsConnectedAction {
  type: typeof SET_DEEZER_IS_CONNECTED;
  payload: {
    isConnected: boolean;
  };
}

export const setDeezerIsConnected = (isConnected: boolean): SetDeezerIsConnectedAction => ({
  type: SET_DEEZER_IS_CONNECTED,
  payload: { isConnected },
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
  payload: { error },
});

export interface ConnectDeezerSuccessAction {
  type: typeof CONNECT_DEEZER_SUCCESS;
}

export const connectDeezerSuccess = (): ConnectDeezerSuccessAction => ({
  type: CONNECT_DEEZER_SUCCESS,
});

export interface SetFlashIgnoredAction {
  type: typeof SET_FLASH_IGNORED;
  payload: { isIgnored: boolean };
}

export const setFlashIgnored = (isIgnored: boolean): SetFlashIgnoredAction => ({
  type: SET_FLASH_IGNORED,
  payload: { isIgnored },
});

export interface SetDeezerDisabledAction {
  type: typeof SET_DEEZER_DISABLED;
  payload: { isDisabled: boolean };
}

export const setDeezerDisabled = (isDisabled: boolean): SetDeezerDisabledAction => ({
  type: SET_DEEZER_DISABLED,
  payload: { isDisabled },
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
  payload: { user: DeezerUser };
}

export const setDeezerCurrentUser = (user: DeezerUser): SetDeezerCurrentUserAction => ({
  type: SET_DEEZER_CURRENT_USER,
  payload: { user },
});

export interface SetDeezerIsPlayingAction {
  type: typeof SET_IS_PLAYING;
  payload: { isPlaying: boolean };
}

export const setDeezerIsPlaying = (isPlaying: boolean): SetDeezerIsPlayingAction => ({
  type: SET_IS_PLAYING,
  payload: { isPlaying },
});

export interface SetPlayingTrackAction {
  type: typeof SET_PLAYING_TRACK;
  payload: {
    index: number | null;
    track: DeezerSdk.Track | null;
  };
}

export const setPlayingTrack = (
  index: number | null,
  track: DeezerSdk.Track | null,
): SetPlayingTrackAction => ({
  type: SET_PLAYING_TRACK,
  payload: { index, track },
});

export interface SetIsPlayerNotMutedAction {
  type: typeof SET_IS_PLAYER_NOT_MUTED;
  payload: {
    isNotMuted: boolean;
  };
}

export const setIsPlayerNotMuted = (isNotMuted: boolean): SetIsPlayerNotMutedAction => ({
  type: SET_IS_PLAYER_NOT_MUTED,
  payload: { isNotMuted },
});

export interface SetPlayerBufferingAction {
  type: typeof SET_PLAYER_BUFFERING;
  payload: {
    buffered: number;
  };
}

export const setPlayerBuffering = (buffered: number): SetPlayerBufferingAction => ({
  type: SET_PLAYER_BUFFERING,
  payload: { buffered },
});

export interface DeezerPlayerLoadedAction {
  type: typeof SET_PLAYER_LOADED;
}

export const setDeezerPlayerLoaded = (): DeezerPlayerLoadedAction => ({
  type: SET_PLAYER_LOADED,
});

export interface SetPlayerPositionAction {
  type: typeof SET_PLAYER_POSITION;
  payload: {
    position: [number, number];
  };
}

export const setPlayerPosition = (position: [number, number]): SetPlayerPositionAction => ({
  type: SET_PLAYER_POSITION,
  payload: { position },
});

export interface SetPlayerRepeatModeAction {
  type: typeof SET_REPEAT_MODE;
  payload: {
    repeatMode: DeezerSdk.RepeatMode;
  };
}

export const setPlayerRepeatMode = (
  repeatMode: DeezerSdk.RepeatMode,
): SetPlayerRepeatModeAction => ({
  type: SET_REPEAT_MODE,
  payload: { repeatMode },
});

export interface SetPlayerShuffleAction {
  type: typeof SET_PLAYER_SHUFFLE;
  payload: {
    isShuffled: boolean;
  };
}

export const setPlayerShuffle = (isShuffled: boolean): SetPlayerShuffleAction => ({
  type: SET_PLAYER_SHUFFLE,
  payload: { isShuffled },
});

export interface DeezerTrackEndAction {
  type: typeof DEEZER_TRACK_END;
  payload: {
    index: number;
  };
}

export const deezerTrackEnd = (index: number): DeezerTrackEndAction => ({
  type: DEEZER_TRACK_END,
  payload: { index },
});

export interface DeezerTrackListChangedAction {
  type: typeof DEEZER_TRACK_LIST_CHANGED;
  payload: { tracks: DeezerSdk.Track[] };
}

export const deezerTrackListChanged = (
  tracks: DeezerSdk.Track[],
): DeezerTrackListChangedAction => ({
  type: DEEZER_TRACK_LIST_CHANGED,
  payload: { tracks },
});

export interface DeezerPlayerVolumeAction {
  type: typeof DEEZER_VOLUME_CHANGED;
  payload: {
    volume: number;
  };
}

export const deezerVolumeChanged = (volume: number): DeezerPlayerVolumeAction => ({
  type: DEEZER_VOLUME_CHANGED,
  payload: { volume },
});

export type DeezerAction =
  | SetDeezerIsConnectedAction
  | ConnectDeezerAction
  | ConnectDeezerPendingAction
  | ConnectDeezerFailureAction
  | ConnectDeezerSuccessAction
  | DisconnectDeezerAction
  | SetFlashIgnoredAction
  | SetDeezerDisabledAction
  | SetDeezerMountedAction
  | SetDeezerInitedAction
  | SetDeezerCurrentUserAction
  | SetDeezerIsPlayingAction
  | SetPlayerBufferingAction
  | SetIsPlayerNotMutedAction
  | DeezerTrackEndAction
  | DeezerPlayerLoadedAction
  | SetPlayerShuffleAction
  | SetPlayerRepeatModeAction
  | SetPlayerPositionAction
  | DeezerPlayerVolumeAction
  | DeezerTrackListChangedAction
  | SetPlayingTrackAction;
