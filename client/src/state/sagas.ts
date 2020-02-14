import {spawn} from 'redux-saga/effects'
import { deezerSaga, DeezerService, DEEZER_SERVICE_CTX_KEY } from './deezer';

export function* rootSaga() {
  yield spawn(deezerSaga);
}

