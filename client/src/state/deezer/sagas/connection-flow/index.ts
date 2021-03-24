import { take, call } from 'redux-saga/effects';
import { CONNECT_DEEZER, DISCONNECT_DEEZER } from '../../consts';
import { disconnectDeezerSaga } from './disconnect-deezer';

export function* deezerConnectionFlow(): any {
  while (true) {
    yield take(CONNECT_DEEZER);

    const { connectDeezerSaga } = yield import('./connect-deezer');

    const isConnected = yield call(connectDeezerSaga);

    if (isConnected) {
      yield take(DISCONNECT_DEEZER);
      yield call(disconnectDeezerSaga);
    }
  }
}
