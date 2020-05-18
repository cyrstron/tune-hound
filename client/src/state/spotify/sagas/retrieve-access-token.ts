import {call, select} from 'redux-saga/effects';
import {selectSpotifyAccessToken} from '@app/state/spotify';
import {checkSpotifyTokenSaga} from './check-token';

export function* retrieveAccessToken(): any {
  yield call(checkSpotifyTokenSaga);

  const accessToken = yield select(selectSpotifyAccessToken);

  return accessToken;
}
