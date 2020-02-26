import { spawn } from 'redux-saga/effects';
import {deezerConnectionFlow} from './connection-flow';
import {ignoreFlash} from './ignore-flash';

export function* deezerSaga() {
  yield spawn(deezerConnectionFlow);
  yield spawn(ignoreFlash);
}
