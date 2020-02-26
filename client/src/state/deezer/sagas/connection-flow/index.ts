import { take, call } from "redux-saga/effects";
import { CONNECT_DEEZER, DISCONNECT_DEEZER } from "../../consts";
import {disconnectDeezerSaga} from './disconnect-deezer';
import {connectDeezerSaga} from './connect-deezer';

export function* deezerConnectionFlow() {
  while (true) {
    yield take(CONNECT_DEEZER);

    const isConnected = yield call(connectDeezerSaga);

    if (isConnected) {
      yield take(DISCONNECT_DEEZER);
      yield call(disconnectDeezerSaga);
    }
  }
}