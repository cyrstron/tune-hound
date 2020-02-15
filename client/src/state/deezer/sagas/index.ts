import { spawn } from 'redux-saga/effects';
import {connectionFlow} from './connection-flow';
import {ignoreFlash} from './ignore-flash';

export function* deezerSaga() {
  yield spawn(connectionFlow);
  yield spawn(ignoreFlash);
}
