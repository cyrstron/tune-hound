import {AppState} from '..';
import {PlayerSource, PlayerTrack, RepeatMode, repeatOneMode, repeatAllMode, noRepeatMode, PlaylistType} from './types';
import {calcNextRandomIndex} from './services';

export const selectIsMuted = (state: AppState): boolean => {
  return state.player.isMuted;
};

export const selectVolume = (state: AppState): number => {
  return state.player.volume;
};

export const selectCurrentTrack = (state: AppState): PlayerTrack | undefined => {
  return state.player.currentTrack;
};

export const selectCurrentIndex = (state: AppState): number | undefined => {
  return state.player.currentTrackIndex;
};

export const selectPlayingSource = (state: AppState): PlayerSource | undefined => {
  return selectCurrentTrack(state)?.source;
};

export const selectIsPlaying = (state: AppState): boolean => {
  return state.player.isPlaying;
};

export const selectPlaylist = (state: AppState): PlayerTrack[] => {
  return state.player.playlist;
};

export const selectPosition = (state: AppState): number | undefined => {
  return state.player.position;
};

export const selectRepeatMode = (state: AppState): RepeatMode => {
  return state.player.repeatMode;
};

export const selectIsShuffled = (state: AppState): boolean => {
  return state.player.isShuffled;
};

export const selectPlayedIndexes = (state: AppState): number[] => {
  return state.player.playedIndexes;
};

export const selectPlayerHistory = (state: AppState): number[] => {
  return state.player.history;
};

export const selectIsPlayerPending = (state: AppState): boolean => {
  return state.player.isPending;
};

export const selectNextIndex = (state: AppState): number | undefined => {
  const currentIndex = selectCurrentIndex(state);
  const repeatMode = selectRepeatMode(state);
  const isShuffled = selectIsShuffled(state);
  const tracks = selectPlaylist(state);
  const playedIndexes = selectPlayedIndexes(state);

  if (currentIndex === undefined) return undefined;

  if (repeatMode === repeatOneMode) return currentIndex;

  if (!isShuffled && repeatMode === noRepeatMode) {
    return currentIndex + 1 < tracks.length ? currentIndex + 1 : undefined;
  } else if (!isShuffled && repeatMode === repeatAllMode) {
    return currentIndex + 1 < tracks.length ? currentIndex + 1 : 0;
  }

  if (repeatMode === noRepeatMode && playedIndexes.length === tracks.length) {
    return undefined;
  } else if (playedIndexes.length === tracks.length) {
    return calcNextRandomIndex(tracks.length, []);
  }

  return calcNextRandomIndex(tracks.length, playedIndexes);
};

export const selectPrevIndex = (state: AppState): number | undefined => {
  const history = selectPlayerHistory(state);

  return history[history.length - 2];
};

export const selectHasNextTrack = (state: AppState): boolean => {
  return selectPlaylist(state).length > 1 && selectNextIndex(state) !== undefined;
};

export const selectHasPrevTrack = (state: AppState): boolean => {
  return selectPlaylist(state).length > 1 && selectPrevIndex(state) !== undefined;
};

export const selectPlaylistId = (state: AppState): string | undefined => (
  state.player.playlistId
);

export const selectNativePlaylistId = (state: AppState): string | number | undefined => (
  state.player.nativePlaylistId
);

export const selectPlaylistType = (state: AppState): PlaylistType | undefined => (
  state.player.playlistType
);

export const selectIsPlaylistActive = (
  state: AppState,
  id: string,
  type: PlaylistType = 'playlist',
): boolean => {
  const playlistId = selectPlaylistId(state);
  const playlistType = selectPlaylistType(state);

  return id === playlistId && type === playlistType;
};

export const selectIsNativePlaylistActive = (
  state: AppState,
  nativeId: string | number,
  type: PlaylistType = 'playlist',
): boolean => {
  const playlistId = selectNativePlaylistId(state);
  const playlistType = selectPlaylistType(state);

  return nativeId === playlistId && type === playlistType;
};

export const selectIsAlbumActive = (state: AppState, id: string): boolean => (
  selectIsPlaylistActive(state, id, 'album')
);

export const selectIsTrackActive = (state: AppState, id: string): boolean => (
  selectIsPlaylistActive(state, id, 'track')
);
