import { createSelector } from 'reselect';
import { AppState } from 'state';
import { DeezerState } from './reducer';

export const selectDeezerState = (state: AppState): DeezerState | undefined => state.deezer;

export const selectDeezerIsConnected = createSelector(
  [selectDeezerState],
  deezer => !!deezer?.isConnected,
);

export const selectDeezerWasConnected = createSelector(
  [selectDeezerState],
  deezer => !!deezer?.wasConnected,
);

export const selectFlashMsgIgnored = createSelector(
  [selectDeezerState],
  deezer => !!deezer?.isFlashMsgIgnored,
);

export const selectFlashEnabled = createSelector(
  [selectDeezerState],
  deezer => !!deezer?.isFlashEnabled,
);

export const selectDeezerError = createSelector([selectDeezerState], deezer => deezer?.error);

export const selectDeezerPending = createSelector(
  [selectDeezerState],
  deezer => !!deezer?.isPending,
);

export const selectDeezerMounted = createSelector(
  [selectDeezerState],
  deezer => !!deezer?.isMounted,
);

export const selectDeezerInited = createSelector([selectDeezerState], deezer => !!deezer?.isInited);

export const selectDeezerCurrentUser = createSelector(
  [selectDeezerState],
  deezer => deezer?.currentUser,
);

export const selectDeezerCurrentUserStatus = createSelector(
  [selectDeezerCurrentUser],
  user => user?.['status'],
);

export const selectDeezerIsPremium = createSelector(
  [selectDeezerCurrentUserStatus],
  userStatus => !!userStatus && userStatus > 0,
);

export const selectDeezerCurrentTrack = createSelector(
  [selectDeezerState],
  deezer => deezer?.playingTrack,
);

export const selectDeezerIsPlaying = createSelector(
  [selectDeezerState],
  deezer => !!deezer?.isPlaying,
);

export const selectCanDeezerPlay = createSelector(
  [selectDeezerIsPremium, selectFlashEnabled],
  (isPremium, isFlashEnabled) => isPremium && isFlashEnabled,
);
