import { PLAY_TRACK, PAUSE, PLAY, SET_PLAYLIST, SET_IS_MUTED, SET_VOLUME, SET_IS_PLAYING } from "./consts";
import { PlayerTrack } from "./types";

export interface PlayTrackAction {
  type: typeof PLAY_TRACK;
  payload: {
    track: PlayerTrack;
  };
}

export const playTrack = (track: PlayerTrack): PlayTrackAction => ({
  type: PLAY_TRACK,
  payload: {track},
});

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
  payload: {tracks: PlayerTrack[];};
}

export const setPlaylist = (tracks: PlayerTrack[]): SetPlaylistAction => ({
  type: SET_PLAYLIST,
  payload: {tracks},
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

export type PlayerAction = PlayTrackAction 
  | PauseAction 
  | PlayAction
  | SetPlaylistAction 
  | SetIsMutedAction
  | SetIsPlayingAction 
  | SetVolumeAction;

