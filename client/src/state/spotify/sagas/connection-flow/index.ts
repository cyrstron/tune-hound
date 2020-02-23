import { take, call } from "redux-saga/effects";
import { CONNECT_SPOTIFY, DISCONNECT_SPOTIFY } from "../../consts";
import {disconnectSpotifySaga} from './disconnect-spotify';
import {connectSpotifySaga} from './connect-spotify';

export function* spotifyConnectionFlow() {
  while (true) {
    yield take(CONNECT_SPOTIFY);

    const isConnected = yield call(connectSpotifySaga);

    if (isConnected) {
      yield take(DISCONNECT_SPOTIFY);
      yield call(disconnectSpotifySaga);
    }
  }
}