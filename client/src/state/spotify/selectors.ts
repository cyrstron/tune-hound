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

export const selectSpotifyIsConnected = ({spotify}: AppState) => spotify.isConnected;
export const selectSpotifyWasConnected = ({spotify}: AppState) => spotify.wasConnected;
