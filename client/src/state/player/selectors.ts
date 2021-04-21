import { AppSelector, AppState } from '..';
import { repeatOneMode, repeatAllMode, noRepeatMode, PlaylistType, RepeatMode } from './types';
import { calcNextRandomIndex } from './services';
import { createSelector } from 'reselect';
import { memoize } from '@app/utils/memoize/memoize';

const selectPlayerState = ({ player }: AppState) => player;

export const selectIsMuted = createSelector([selectPlayerState], player => !!player?.isMuted);

export const selectVolume = createSelector([selectPlayerState], player => player?.volume ?? 0);

export const selectCurrentTrack = createSelector(
  [selectPlayerState],
  player => player?.currentTrack,
);

export const selectCurrentIndex = createSelector(
  [selectPlayerState],
  player => player?.currentTrackIndex,
);

export const selectPlayingSource = createSelector(
  [selectCurrentTrack],
  currentTrack => currentTrack?.source,
);

export const selectIsPlaying = createSelector([selectPlayerState], player => !!player?.isPlaying);

export const selectPlaylist = createSelector([selectPlayerState], player => player?.playlist ?? []);

export const selectPosition = createSelector([selectPlayerState], player => player?.position);

export const selectRepeatMode = createSelector(
  [selectPlayerState],
  player => player?.repeatMode ?? RepeatMode.NO_REPEAT,
);

export const selectIsShuffled = createSelector([selectPlayerState], player => !!player?.isShuffled);

export const selectPlayedIndexes = createSelector(
  [selectPlayerState],
  player => player?.playedIndexes ?? [],
);

export const selectPlayerHistory = createSelector(
  [selectPlayerState],
  player => player?.history ?? [],
);

export const selectIsPlayerPending = createSelector(
  [selectPlayerState],
  player => !!player?.isPending,
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

export const selectPlaylistId = createSelector([selectPlayerState], player => player?.playlistId);

export const selectNativePlaylistId = createSelector(
  [selectPlayerState],
  player => player?.nativePlaylistId,
);

export const selectPlaylistType = createSelector(
  [selectPlayerState],
  player => player?.playlistType,
);

export const createIsPlaylistActiveSelector = memoize(
  (id: string, type: PlaylistType = PlaylistType.PLAYLIST): AppSelector<boolean> =>
    createSelector(
      [selectPlaylistId, selectPlaylistType],
      (playlistId, playlistType) => id === playlistId && type === playlistType,
    ),
);

export const createIsNativePlaylistActiveSelector = memoize(
  (nativeId: string | number, type: PlaylistType = PlaylistType.PLAYLIST): AppSelector<boolean> =>
    createSelector(
      [selectNativePlaylistId, selectPlaylistType],
      (playlistId, playlistType) => nativeId === playlistId && type === playlistType,
    ),
);

export const createIsAlbumActiveSelector = (id: string): AppSelector<boolean> =>
  createIsPlaylistActiveSelector(id, PlaylistType.ALBUM);

export const createIsTrackActiveSelector = (id: string): AppSelector<boolean> =>
  createIsPlaylistActiveSelector(id, PlaylistType.TRACK);
