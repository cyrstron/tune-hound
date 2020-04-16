import {call, select} from 'redux-saga/effects';
import { updateSpotifyTokenSaga } from '@app/state/spotify/sagas/update-token';
import { selectSpotifyAccessToken } from '@app/state/spotify';

export function* retrieveAccessToken() {
  yield call(updateSpotifyTokenSaga);

  const accessToken = yield select(selectSpotifyAccessToken);

  return accessToken;
}