import { 
  PLAY_TRACK, 
  PAUSE, 
  PLAY, 
  SET_PLAYLIST, 
  SET_IS_MUTED, 
  SET_VOLUME, 
  SET_IS_PLAYING, 
  SET_CURRENT_TRACK,
  RESET_CURRENT_TRACK,
  SEEK,
  SET_POSITION,
  PLAY_NEXT,
  PLAY_PREV,
  SET_IS_SHUFFLED,
  RESET_PLAY_HISTORY,
  RESET_PLAYED_INDEXES,
  SET_REPEAT_MODE,
  SET_PLAYER_HISTORY,
  SET_IS_PENDING,
} from "./consts";
import { PlayerTrack, RepeatMode, PlaylistType } from "./types";

export interface PlayTrackAction {
  type: typeof PLAY_TRACK;
  payload: {
    track: PlayerTrack;
  };
}

export const playTrack = (
  id: string, 
  track: PlayerTrack, 
  nativeId?: string | number,
  index?: number,
) => setPlaylist(id, 'track', [track], nativeId, index);
export const playAlbum = (
  id: string, 
  tracks: PlayerTrack[], 
  nativeId?: string | number,
  index?: number,
) => setPlaylist(id, 'album', tracks,  nativeId, index);
export const playPlaylist = (
  id: string, 
  tracks: PlayerTrack[], 
  nativeId?: string | number,
  index?: number,
) => setPlaylist(id, 'playlist', tracks,  nativeId, index);

export interface PauseAction {
  type: typeof PAUSE;
}

export const pause = (): PauseAction => ({
  type: PAUSE,
});

export interface PlayAction {
  type: typeof PLAY;
}

export const play = (): PlayAction => ({
  type: PLAY,
});

export interface PlayNextAction {
  type: typeof PLAY_NEXT;
}

export const playNext = (): PlayNextAction => ({
  type: PLAY_NEXT,
});

export interface PlayPrevAction {
  type: typeof PLAY_PREV;
}

export const playPrev = (): PlayPrevAction => ({
  type: PLAY_PREV,
});

export interface SeekAction {
  type: typeof SEEK;
  payload: {position: number}
}

export const seek = (position: number): SeekAction => ({
  type: SEEK,
  payload: {position},
});

export interface SetIsPlayerPendingAction {
  type: typeof SET_IS_PENDING;
  payload: {isPending: boolean};
}

export const setIsPlayerPending = (isPending: boolean): SetIsPlayerPendingAction => ({
  type: SET_IS_PENDING,
  payload: {isPending},
});

export interface SetIsPlayingAction {
  type: typeof SET_IS_PLAYING;
  payload: {isPlaying: boolean};
}

export const setIsPlaying = (isPlaying: boolean): SetIsPlayingAction => ({
  type: SET_IS_PLAYING,
  payload: {isPlaying},
});

export interface SetPlaylistAction {
  type: typeof SET_PLAYLIST;
  payload: {
    tracks: PlayerTrack[];
    type: PlaylistType;
    id: string;
    nativeId?: string | number;
    index?: number;
  };
}

export const setPlaylist = (
  id: string, 
  type: PlaylistType, 
  tracks: PlayerTrack[], 
  nativeId?: string | number, 
  index?: number,
): SetPlaylistAction => ({
  type: SET_PLAYLIST,
  payload: {id, type, tracks, nativeId, index},
});

export interface SetIsMutedAction {
  type: typeof SET_IS_MUTED;
  payload: {isMuted: boolean;};
}

export const setIsMuted = (isMuted: boolean): SetIsMutedAction => ({
  type: SET_IS_MUTED,
  payload: {isMuted},
});

export interface SetVolumeAction {
  type: typeof SET_VOLUME;
  payload: {volume: number;};
}

export const setVolume = (volume: number): SetVolumeAction => ({
  type: SET_VOLUME,
  payload: {volume},
});

export interface SetRepeatModeAction {
  type: typeof SET_REPEAT_MODE;
  payload: {repeatMode: RepeatMode;};
}

export const setRepeatMode = (repeatMode: RepeatMode): SetRepeatModeAction => ({
  type: SET_REPEAT_MODE,
  payload: {repeatMode},
});

export interface SetIsShuffledAction {
  type: typeof SET_IS_SHUFFLED;
  payload: {isShuffled: boolean;};
}

export const setIsShuffled = (isShuffled: boolean): SetIsShuffledAction => ({
  type: SET_IS_SHUFFLED,
  payload: {isShuffled},
});

export interface SetPositionAction {
  type: typeof SET_POSITION;
  payload: {position: number;};
}

export const setPosition = (position: number): SetPositionAction => ({
  type: SET_POSITION,
  payload: {position},
});

export interface SetPlayerHistoryAction {
  type: typeof SET_PLAYER_HISTORY;
  payload: {history: number[];};
}

export const setPlayerHistory = (history: number[]): SetPlayerHistoryAction => ({
  type: SET_PLAYER_HISTORY,
  payload: {history},
});

export interface SetCurrentTrackAction {
  type: typeof SET_CURRENT_TRACK;
  payload: {track: PlayerTrack, index: number; isAutoplay: boolean};
}

export const setCurrentTrack = (track: PlayerTrack, index: number = 0, isAutoplay: boolean = false): SetCurrentTrackAction => ({
  type: SET_CURRENT_TRACK,
  payload: {track, index, isAutoplay},
});

export interface ResetCurrentTrackAction {
  type: typeof RESET_CURRENT_TRACK;
}

export const resetCurrentTrack = (): ResetCurrentTrackAction => ({
  type: RESET_CURRENT_TRACK,
});

export interface ResetPlayHistoryAction {
  type: typeof RESET_PLAY_HISTORY;
}

export const resetPlayHistory = (): ResetPlayHistoryAction => ({
  type: RESET_PLAY_HISTORY,
});

export interface ResetPlayedIndexesAction {
  type: typeof RESET_PLAYED_INDEXES;
}

export const resetPlayedIndexes = (): ResetPlayedIndexesAction => ({
  type: RESET_PLAYED_INDEXES,
});

export type PlayerAction = 
  // | PlayTrackAction 
  | SetPlayerHistoryAction
  | PauseAction 
  | PlayAction
  | SeekAction
  | PlayPrevAction
  | SetPlaylistAction 
  | SetIsMutedAction
  | SetIsPlayingAction 
  | SetIsPlayerPendingAction
  | SetCurrentTrackAction
  | ResetCurrentTrackAction
  | SetPositionAction
  | ResetPlayedIndexesAction
  | SetRepeatModeAction
  | ResetPlayHistoryAction
  | SetIsShuffledAction
  | SetVolumeAction;

