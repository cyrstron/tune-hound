import { spawn } from 'redux-saga/effects';
import {connectDeezerSaga} from './connect-deezer';

export function* deezerSaga() {
  yield spawn(connectDeezerSaga);
}
