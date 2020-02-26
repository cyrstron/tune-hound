import { spawn } from 'redux-saga/effects';
import {spotifyConnectionFlow} from './connection-flow';
import {ignoreSpotifyActivePlayerMsg} from './ignore-active-player-msg';

export function* spotifySaga() {
  yield spawn(spotifyConnectionFlow);
  yield spawn(ignoreSpotifyActivePlayerMsg);
}
