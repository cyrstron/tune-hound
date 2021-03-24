import { AppState } from '..';
import { repeatOneMode, repeatAllMode, noRepeatMode, PlaylistType } from './types';
import { calcNextRandomIndex } from './services';
import { createSelector } from 'reselect';

const selectPlayerState = createSelector([], ({ player }: AppState) => player);

export const selectIsMuted = createSelector([selectPlayerState], player => player.isMuted);

export const selectVolume = createSelector([selectPlayerState], player => player.volume);

export const selectCurrentTrack = createSelector(
  [selectPlayerState],
  player => player.currentTrack,
);

export const selectCurrentIndex = createSelector(
  [selectPlayerState],
  player => player.currentTrackIndex,
);

export const selectPlayingSource = createSelector(
  [selectCurrentTrack],
  currentTrack => currentTrack?.source,
);

export const selectIsPlaying = createSelector([selectPlayerState], player => player.isPlaying);

export const selectPlaylist = createSelector([selectPlayerState], player => player.playlist);

export const selectPosition = createSelector([selectPlayerState], player => player.position);

export const selectRepeatMode = createSelector([selectPlayerState], player => player.repeatMode);

export const selectIsShuffled = createSelector([selectPlayerState], player => player.isShuffled);

export const selectPlayedIndexes = createSelector(
  [selectPlayerState],
  player => player.playedIndexes,
);

export const selectPlayerHistory = createSelector([selectPlayerState], player => player.history);

export const selectIsPlayerPending = createSelector(
  [selectPlayerState],
  player => player.isPending,
);

export const selectNextIndex = createSelector(
  [selectCurrentIndex, selectRepeatMode, selectIsShuffled, selectPlaylist, selectPlayedIndexes],
  (currentIndex, repeatMode, isShuffled, tracks, playedIndexes) => {
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
  },
);

export const selectPrevIndex = createSelector(
  [selectPlayerHistory],
  history => history[history.length - 2],
);

export const selectHasNextTrack = createSelector(
  [selectPlaylist, selectNextIndex],
  (playlist, nextIndex) => playlist.length > 1 && nextIndex !== undefined,
);

export const selectHasPrevTrack = createSelector(
  [selectPlaylist, selectPrevIndex],
  (playlist, prevIndex) => playlist.length > 1 && prevIndex !== undefined,
);

export const selectPlaylistId = createSelector([selectPlayerState], player => player.playlistId);

export const selectNativePlaylistId = createSelector(
  [selectPlayerState],
  player => player.nativePlaylistId,
);

export const selectPlaylistType = createSelector(
  [selectPlayerState],
  player => player.playlistType,
);

export const createIsPlaylistActiveSelector = (
  id: string,
  type: PlaylistType = 'playlist',
): ((state: AppState) => boolean) =>
  createSelector(
    [selectPlaylistId, selectPlaylistType],
    (playlistId, playlistType) => id === playlistId && type === playlistType,
  );

export const createIsNativePlaylistActiveSelector = (
  nativeId: string | number,
  type: PlaylistType = 'playlist',
): ((state: AppState) => boolean) =>
  createSelector(
    [selectNativePlaylistId, selectPlaylistType],
    (playlistId, playlistType) => nativeId === playlistId && type === playlistType,
  );

export const createIsAlbumActiveSelector = (id: string): ((state: AppState) => boolean) =>
  createIsPlaylistActiveSelector(id, 'album');

export const createIsTrackActiveSelector = (id: string): ((state: AppState) => boolean) =>
  createIsPlaylistActiveSelector(id, 'track');
