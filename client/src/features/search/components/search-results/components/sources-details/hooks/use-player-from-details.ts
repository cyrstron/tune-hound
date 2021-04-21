import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentIndex,
  createIsNativePlaylistActiveSelector,
  selectIsPlayerPending,
  selectIsPlaying,
} from '@app/state/player/selectors';
import { playSearchResult } from '@app/features/search/search';
import { useCallback } from 'react';
import { createExtensionPendingSelector } from '@app/features/search/search/selectors';
import { pause } from '@app/state/player/actions';
import { PlaylistType } from '@app/state/player/types';
import { SearchSource } from '@app/features/search/search/types';
import { useSelectorCreator } from '@app/hooks/use-seletor-creator';

export const usePlayerFromDetails = (
  id: string,
  source: SearchSource,
  nativeId: string | number,
  type?: PlaylistType,
): {
  isPlaying: boolean;
  isPaused: boolean;
  isPending: boolean;
  currentIndex: number | undefined;
  onPlay: (index: number) => void;
  onPause: () => void;
} => {
  const dispatch = useDispatch();

  const currentIndex = useSelector(selectCurrentIndex);

  const isPlaylistActive = useSelectorCreator(createIsNativePlaylistActiveSelector, nativeId, type);
  const isPlaying = useSelector(selectIsPlaying);
  const isPending = useSelector(selectIsPlayerPending);

  const isExtending = useSelectorCreator(createExtensionPendingSelector, id, source);

  const onPlay = useCallback(
    (index: number) => {
      const action = playSearchResult(id, source, index);

      dispatch(action);
    },
    [id, dispatch, source],
  );

  const onPause = useCallback(() => {
    const action = pause();

    dispatch(action);
  }, [dispatch]);

  return {
    isPlaying: isPlaylistActive && isPlaying,
    isPaused: isPlaylistActive && !isPlaying,
    isPending: isPlaylistActive && (isPending || isExtending),
    currentIndex: isPlaylistActive ? currentIndex : undefined,
    onPlay,
    onPause,
  };
};
