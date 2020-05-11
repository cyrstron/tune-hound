import { useDispatch, useSelector } from "react-redux";
import { selectCurrentIndex, selectIsNativePlaylistActive, selectIsPlayerPending, selectIsPlaying } from "@app/state/player/selectors";
import { AppState } from "@app/state";
import { playSearchResult } from "@app/state/search";
import { useCallback } from "react";
import { selectExtensionPending } from "@app/state/search/selectors";
import { pause } from "@app/state/player/actions";
import { PlaylistType } from "@app/state/player/types";
import { SearchSource } from "@app/state/search/types";

export const usePlayerFromDetails = (id: string, source: SearchSource, nativeId: string | number, type?: PlaylistType) => {
  const dispatch = useDispatch();

  const currentIndex = useSelector(selectCurrentIndex);

  const isPlaylistActive = useSelector<AppState, boolean>(
    (state) => selectIsNativePlaylistActive(state, nativeId, type)
  );
  const isPlaying = useSelector(selectIsPlaying);
  const isPending = useSelector(selectIsPlayerPending);

  const isExtending = useSelector<AppState, boolean>(
    (state) => selectExtensionPending(state, id, source)
  );

  const onPlay = useCallback((index: number) => {
    const action = playSearchResult(id, source, index);

    dispatch(action);
  }, [id, dispatch]);

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
  }
};