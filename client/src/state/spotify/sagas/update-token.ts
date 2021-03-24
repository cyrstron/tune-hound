import { put, select, getContext } from 'redux-saga/effects';
import { SPOTIFY_SERVICE_CTX_KEY } from '@app/consts';

import { SpotifyService } from '../services/spotify-service';
import { selectSpotifyRefreshToken, selectSpotifyAuthData } from '../selectors';
import {
  updateSpotifyAccessTokenPending,
  updateSpotifyAccessTokenFailure,
  updateSpotifyAccessTokenSuccess,
} from '../actions';
import { SpotifyAuthData, setSpotifyAuthState } from '../services/helpers';

export function* updateSpotifyTokenSaga(): any {
  const refreshToken: string = yield select(selectSpotifyRefreshToken);

  if (!refreshToken) return;

  const spotifyService: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);

  const pendingAction = updateSpotifyAccessTokenPending();

  yield put(pendingAction);

  try {
    const {
      accessToken,
      expiresIn,
    }: {
      accessToken: string;
      expiresIn: Date;
    } = yield spotifyService.api.refreshAccessToken(refreshToken);

    const authData: SpotifyAuthData = yield select(selectSpotifyAuthData);

    setSpotifyAuthState({
      ...authData,
      accessToken,
      expiresIn,
    });

    const successAction = updateSpotifyAccessTokenSuccess(accessToken, expiresIn);

    yield put(successAction);
  } catch (err) {
    const failureAction = updateSpotifyAccessTokenFailure(err);

    yield put(failureAction);
  }
}
