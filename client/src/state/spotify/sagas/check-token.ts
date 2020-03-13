import {select, call} from 'redux-saga/effects';

import {selectIsSpotifyTokenExpired} from '../selectors';
import { 
  updateSpotifyTokenSaga
} from './update-token';

export function* checkSpotifyTokenSaga() {
  const isExpired: string = yield select(selectIsSpotifyTokenExpired);

  if (!isExpired) return;

  yield call(updateSpotifyTokenSaga);
}