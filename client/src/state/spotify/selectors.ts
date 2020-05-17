import { AppState } from '../';

export const selectSpotifyAuthData = ({spotify}: AppState) => spotify.authData;
export const selectIsSpotifyLoggedIn = ({spotify}: AppState) => !!spotify.authData;
export const selectSpotifyConnectPending = ({spotify}: AppState) => spotify.isPending;
export const selectSpotifyConnectError = ({spotify}: AppState) => spotify.error;

export const selectIsSpotifyTokenExpired = ({spotify}: AppState) => !spotify.authData || 
  spotify.authData.expiresIn < new Date();

export const selectSpotifyRefreshToken = ({spotify}: AppState) => spotify.authData?.refreshToken;
export const selectSpotifyAccessToken = ({spotify}: AppState) => spotify.authData?.accessToken;

export const selectSpotifyCurrentUser = ({spotify}: AppState) => spotify.currentUser;

export const selectIsSpotifyPremium = (state: AppState) => {
  const user = selectSpotifyCurrentUser(state);

  return !!user && user.product === 'product';
}

export const selectIsSpotifyConnected = ({spotify}: AppState) => spotify.isConnected;
export const selectIsSpotifyMounted = ({spotify}: AppState) => spotify.isMounted;
export const selectIsSpotifyPlayerInited = ({spotify}: AppState) => spotify.isPlayerInited;
export const selectSpotifyWasConnected = ({spotify}: AppState) => spotify.wasConnected;

export const selectIsSpotifyPlayerActive = ({spotify}: AppState) => spotify.playbackState !== null;
export const selectIsSpotifyPlayerMsgIgnored = ({spotify}: AppState) => spotify.isPlayerMsgIgnored;

export const selectShouldShowSpotifyPlayerMessage = (state: AppState) => {
  const isConnected = selectIsSpotifyConnected(state);
  const isActive = selectIsSpotifyPlayerActive(state);
  const isIgnored = selectIsSpotifyPlayerMsgIgnored(state);

  return isConnected && !isActive && !isIgnored;
}

export const selectCanSpotifyPlay = (state: AppState) => {
  return selectIsSpotifyPremium(state);
}

export const selectSpotifyPlayerDeviceId = ({spotify}: AppState) => spotify.playbackInstance?.['device_id'];

export const selectSpotifyCurrentTrack = (
  {spotify}: AppState,
): Spotify.Track | undefined => spotify.playbackState?.track_window.current_track;
