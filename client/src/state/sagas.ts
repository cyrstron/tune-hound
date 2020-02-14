import {spawn} from 'redux-saga/effects'
import { deezerSaga } from './deezer';

export function* rootSaga() {
  yield spawn(deezerSaga);
}

