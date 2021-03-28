import { createSelector } from 'reselect';
import { AppState } from '../';
import { SpotifyState } from './reducer';

export const selectSpotifyState = (state: AppState): SpotifyState | undefined => state.spotify;

export const selectSpotifyAuthData = createSelector(
  [selectSpotifyState],
  spotify => spotify?.authData,
);

export const selectIsSpotifyLoggedIn = createSelector(
  [selectSpotifyAuthData],
  authData => !!authData,
);

export const selectSpotifyConnectPending = createSelector(
  [selectSpotifyState],
  spotify => !!spotify?.isPending,
);

export const selectSpotifyConnectError = createSelector(
  [selectSpotifyState],
  spotify => spotify?.error,
);

export const selectAuthData = createSelector([selectSpotifyState], spotify => spotify?.authData);

export const selectAuthTokenExpirationDate = createSelector(
  [selectAuthData],
  authData => authData?.expiresIn,
);

export const selectIsSpotifyTokenExpired = createSelector(
  [selectAuthTokenExpirationDate],
  expirationDate => !expirationDate || expirationDate < new Date(),
);

export const selectSpotifyRefreshToken = createSelector(
  [selectAuthData],
  authData => authData?.refreshToken,
);

export const selectSpotifyAccessToken = createSelector(
  [selectAuthData],
  authData => authData?.accessToken,
);

export const selectSpotifyCurrentUser = createSelector(
  [selectSpotifyState],
  spotify => spotify?.currentUser,
);

export const selectSpotifyCurrentUserProduct = createSelector(
  [selectSpotifyCurrentUser],
  currentUser => currentUser?.product,
);

export const selectIsSpotifyPremium = createSelector(
  [selectSpotifyCurrentUserProduct],
  product => product === 'premium',
);

export const selectIsSpotifyConnected = createSelector(
  [selectSpotifyState],
  spotify => !!spotify?.isConnected,
);

export const selectIsSpotifyMounted = createSelector(
  [selectSpotifyState],
  spotify => !!spotify?.isMounted,
);

export const selectIsSpotifyPlayerInited = createSelector(
  [selectSpotifyState],
  spotify => !!spotify?.isPlayerInited,
);

export const selectSpotifyWasConnected = createSelector(
  [selectSpotifyState],
  spotify => !!spotify?.wasConnected,
);

export const selectIsSpotifyPlayerReady = createSelector(
  [selectSpotifyState],
  spotify => !!spotify?.isPlaybackReady,
);

export const selectSpotifyPlaybackState = createSelector(
  [selectSpotifyState],
  spotify => spotify?.playbackState,
);

export const selectIsSpotifyPlayerActive = createSelector(
  [selectSpotifyPlaybackState],
  playbackState => !!playbackState,
);

export const selectIsSpotifyPlayerMsgIgnored = createSelector(
  [selectSpotifyState],
  spotify => !!spotify?.isPlayerMsgIgnored,
);

export const selectShouldShowSpotifyPlayerMessage = createSelector(
  [selectIsSpotifyConnected, selectIsSpotifyPlayerActive, selectIsSpotifyPlayerMsgIgnored],
  (isConnected, isActive, isIgnored) => isConnected && !isActive && !isIgnored,
);

export const selectCanSpotifyPlay = createSelector(
  [selectIsSpotifyPremium],
  isPremium => isPremium,
);

export const selectSpotifyPlaybackInstance = createSelector(
  [selectSpotifyState],
  spotify => spotify?.playbackInstance,
);

export const selectSpotifyPlayerDeviceId = createSelector(
  [selectSpotifyPlaybackInstance],
  playbackInstance => playbackInstance?.['device_id'],
);

export const selectSpotifyCurrentTrack = createSelector(
  [selectSpotifyPlaybackState],
  playbackState => playbackState?.['track_window']['current_track'],
);
