import {spawn} from 'redux-saga/effects'
import { deezerSaga } from './deezer';
import { searchSaga } from './search';

export function* rootSaga() {
  yield spawn(deezerSaga);
  yield spawn(searchSaga);
}

