import { take, getContext, put, call, takeLeading } from "redux-saga/effects";
import {eventChannel, END, EventChannel} from 'redux-saga';
import {deezerConfig, DEEZER_SERVICE_CTX_KEY} from 'consts';
import { 
  setDeezerIsConnected,
  connectDeezerPending, 
  connectDeezerSuccess, 
  connectDeezerFailure,
  setDeezerPlayerReady,
} from "../actions";
import { DeezerService } from "../services";
import {
  CONNECT_DEEZER, 
  DISCONNECT_DEEZER,
} from '../consts';
import { setDeezerConnectedState } from "../services/helpers";

export function* connectDeezerSaga() {
  while(true) {
    yield take(CONNECT_DEEZER);

    const pendingAction = connectDeezerPending();

    yield put(pendingAction);

    const deezerService: DeezerService = yield getContext(DEEZER_SERVICE_CTX_KEY);


    try {
      let isLoggedIn: boolean;

      if (!deezerService.isMounted) {
        const response: DeezerSdk.SdkOptions = yield deezerService.mount({
          ...deezerConfig, 
          player: {},
        });

        isLoggedIn = !!response?.token?.access_token;
      } else {
        isLoggedIn = yield deezerService.isLoggedIn();
      }

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