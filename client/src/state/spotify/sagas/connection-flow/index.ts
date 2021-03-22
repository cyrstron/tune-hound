import {take, call, fork, cancel} from 'redux-saga/effects';
import {DISCONNECT_SPOTIFY} from '../../consts';
import {disconnectSpotifySaga} from './disconnect-spotify';
import {Task} from 'redux-saga';

export function* spotifyConnectionFlow(): any {
  const {connectSpotify} = yield import('./connect-spotify');

  const task: Task = yield fork(connectSpotify);

  yield take(DISCONNECT_SPOTIFY);

  yield cancel(task);

  yield call(disconnectSpotifySaga);
}
