import { spawn } from 'redux-saga/effects';

import { deezerSaga } from './deezer';
import { searchSaga } from './search';
import { spotifySaga } from './spotify';

export function* rootSaga() {
  yield spawn(deezerSaga);
  yield spawn(spotifySaga);
  yield spawn(searchSaga);
}
