import {AppState} from '../';
import {SpotifyAuthData} from './services/helpers';

export const selectSpotifyAuthData = ({
  spotify,
}: AppState): SpotifyAuthData | undefined => spotify.authData;
export const selectIsSpotifyLoggedIn = ({
  spotify,
}: AppState): boolean => !!spotify.authData;
export const selectSpotifyConnectPending = ({
  spotify,
}: AppState): boolean => spotify.isPending;
export const selectSpotifyConnectError = ({
  spotify,
}: AppState): Error | undefined => spotify.error;

export const selectIsSpotifyTokenExpired = ({
  spotify,
}: AppState): boolean => !spotify.authData ||
  spotify.authData.expiresIn < new Date();

export const selectSpotifyRefreshToken = ({
  spotify,
}: AppState): string | undefined => spotify.authData?.refreshToken;

export const selectSpotifyAccessToken = ({
  spotify,
}: AppState): string | undefined => spotify.authData?.accessToken;

export const selectSpotifyCurrentUser = ({
  spotify,
}: AppState): SpotifyApi.CurrentUsersProfileResponse | undefined => spotify.currentUser;

export const selectIsSpotifyPremium = (state: AppState): boolean => {
  const user = selectSpotifyCurrentUser(state);

  return !!user && user.product === 'product';
};

export const selectIsSpotifyConnected = ({spotify}: AppState): boolean => spotify.isConnected;
export const selectIsSpotifyMounted = ({spotify}: AppState): boolean => spotify.isMounted;
export const selectIsSpotifyPlayerInited = ({spotify}: AppState): boolean => spotify.isPlayerInited;
export const selectSpotifyWasConnected = ({spotify}: AppState): boolean => spotify.wasConnected;

export const selectIsSpotifyPlayerActive = ({
  spotify,
}: AppState): boolean => spotify.playbackState !== null;

export const selectIsSpotifyPlayerMsgIgnored = ({
  spotify,
}: AppState): boolean => spotify.isPlayerMsgIgnored;

export const selectShouldShowSpotifyPlayerMessage = (state: AppState): boolean => {
  const isConnected = selectIsSpotifyConnected(state);
  const isActive = selectIsSpotifyPlayerActive(state);
  const isIgnored = selectIsSpotifyPlayerMsgIgnored(state);

  return isConnected && !isActive && !isIgnored;
};

export const selectCanSpotifyPlay = (state: AppState): boolean => {
  return selectIsSpotifyPremium(state);
};

export const selectSpotifyPlayerDeviceId = ({
  spotify,
}: AppState): string | undefined => spotify.playbackInstance?.['device_id'];

export const selectSpotifyPlaybackState = ({
  spotify,
}: AppState): Spotify.PlaybackState | null | undefined => spotify.playbackState;

export const selectSpotifyCurrentTrack = (
  state: AppState,
): Spotify.Track | undefined => selectSpotifyPlaybackState(state)?.['track_window']['current_track'];
