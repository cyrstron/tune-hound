import { useSelector } from 'react-redux';
import {
  selectCurrentIndex,
  createIsNativePlaylistActiveSelector,
  selectIsPlayerPending,
  selectIsPlaying,
} from '@app/state/player/selectors';
import { useCallback } from 'react';
import { pause } from '@app/state/player/actions';
import { PlaylistType } from '@app/state/player/types';
import { useSelectorCreator } from '@app/hooks/use-seletor-creator';
import { useDispatcher, useParamsSelector } from '@app/hooks';
import { selectExtensionPendingByIdAndSource } from '@app/features/search/state/selectors';
import { SearchSource } from '@app/features/search/state/types';
import { playSearchResult } from '@app/features/search/state';

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
  const dispatcher = useDispatcher();

  const currentIndex = useSelector(selectCurrentIndex);

  const isPlaylistActive = useSelectorCreator(createIsNativePlaylistActiveSelector, nativeId, type);
  const isPlaying = useSelector(selectIsPlaying);
  const isPending = useSelector(selectIsPlayerPending);

  const isExtending = useParamsSelector(selectExtensionPendingByIdAndSource, id, source);

  const onPlay = useCallback(
    (index: number) => {
      dispatcher(playSearchResult, id, source, index);
    },
    [id, dispatcher, source],
  );

  const onPause = useCallback(() => {
    dispatcher(pause);
  }, [dispatcher]);

  return {
    isPlaying: isPlaylistActive && isPlaying,
    isPaused: isPlaylistActive && !isPlaying,
    isPending: isPlaylistActive && (isPending || isExtending),
    currentIndex: isPlaylistActive ? currentIndex : undefined,
    onPlay,
    onPause,
  };
};
