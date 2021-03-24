import { useDispatch, useSelector } from 'react-redux';
import {
  selectNativePlaylistId,
  selectIsPlayerPending,
  selectIsPlaying,
} from '@app/state/player/selectors';
import { useCallback } from 'react';
import { pause, playBySourceId } from '@app/state/player/actions';
import { PlaylistType } from '@app/state/player/types';
import { SearchSource } from '@app/state/search/types';

export const usePlayerById = (
  type: PlaylistType,
): {
  isPlaying: boolean;
  isPaused: boolean;
  isPending: boolean;
  activeId: string | number | undefined;
  onPlay: (id: string | number, source: SearchSource) => void;
  onPause: () => void;
} => {
  const dispatch = useDispatch();

  const activeNativeId = useSelector(selectNativePlaylistId);
  const isPlaying = useSelector(selectIsPlaying);
  const isPending = useSelector(selectIsPlayerPending);

  const onPlay = useCallback(
    (id: string | number, source: SearchSource) => {
      const action = playBySourceId(id, type, source);

      dispatch(action);
    },
    [type, dispatch],
  );

  const onPause = useCallback(() => {
    const action = pause();

    dispatch(action);
  }, [dispatch]);

  return {
    isPlaying: isPlaying,
    isPaused: activeNativeId !== undefined && !isPlaying,
    isPending: isPending,
    activeId: activeNativeId,
    onPlay,
    onPause,
  };
};
