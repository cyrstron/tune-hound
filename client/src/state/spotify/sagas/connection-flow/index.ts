import {take, call} from 'redux-saga/effects';
import {CONNECT_SPOTIFY, DISCONNECT_SPOTIFY} from '../../consts';
import {disconnectSpotifySaga} from './disconnect-spotify';
import {EventChannel} from 'redux-saga';

export function* spotifyConnectionFlow(): any {
  while (true) {
    yield take(CONNECT_SPOTIFY);

    const {connectSpotifySaga} = yield import('./connect-spotify');

    const channels: {
      [key: string]: EventChannel<any>;
    } = yield call(connectSpotifySaga);

    if (channels) {
      yield take(DISCONNECT_SPOTIFY);
      yield call(disconnectSpotifySaga, channels);
    }
  }
}
