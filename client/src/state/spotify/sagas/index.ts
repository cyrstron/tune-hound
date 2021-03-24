import { takeEvery } from 'redux-saga/effects';
import { CONNECT_SPOTIFY, SET_SPOTIFY_ACTIVE_PLAYER_IGNORED } from '../consts';
import { spotifyConnectionFlow } from './connection-flow';
import { ignoreSpotifyActivePlayerMsg } from './ignore-active-player-msg';

export function* spotifySaga(): any {
  yield takeEvery(CONNECT_SPOTIFY, spotifyConnectionFlow);
  yield takeEvery(SET_SPOTIFY_ACTIVE_PLAYER_IGNORED, ignoreSpotifyActivePlayerMsg);
}
