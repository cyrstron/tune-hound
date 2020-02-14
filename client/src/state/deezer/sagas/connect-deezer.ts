import { take, getContext, put } from "redux-saga/effects";
import {deezerConfig} from 'consts/config';
import { 
  setDeezerIsConnected,
  connectDeezerPending, 
  connectDeezerSuccess, 
  connectDeezerFailure,
} from "../actions";
import { DeezerService } from "../services";
import {
  CONNECT_DEEZER, 
  DISCONNECT_DEEZER, 
  DEEZER_SERVICE_CTX_KEY,
} from '../consts';
import { setDeezerConnectedState } from "../services/helpers";

export function* connectDeezerSaga() {
  while(true) {
    yield take(CONNECT_DEEZER);

    const pendingAction = connectDeezerPending();

    yield put(pendingAction);

    const deezerService: DeezerService = yield getContext(DEEZER_SERVICE_CTX_KEY);

    try {
      if (!deezerService.isMounted) {
        yield deezerService.mount(deezerConfig);
      }
    
      const isLoggedIn = yield deezerService.isLoggedIn();

      if (!isLoggedIn) {
        yield deezerService.connect();
      }

      setDeezerConnectedState(true);

      const successAction = connectDeezerSuccess();

      yield put(successAction);
    } catch (err) {
      const failureAction = connectDeezerFailure(err);

      yield put(failureAction);
    };

    yield take(DISCONNECT_DEEZER);

    deezerService.disconnect();
    
    setDeezerConnectedState(false);

    const disconnectAction = setDeezerIsConnected(false);

    yield put(disconnectAction);
  }
}