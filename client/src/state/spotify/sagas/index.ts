import { spawn } from 'redux-saga/effects';
import {spotifyConnectionFlow} from './connection-flow';

export function* spotifySaga() {
  yield spawn(spotifyConnectionFlow);
}
