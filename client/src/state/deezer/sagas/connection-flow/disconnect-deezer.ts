import {getContext, put} from "redux-saga/effects";
import {DEEZER_SERVICE_CTX_KEY} from 'consts';
import { 
  setDeezerIsConnected,
} from "../../actions";
import { DeezerService } from "../../services";
import { setDeezerConnectedState } from "../../services/helpers";

export function* disconnectDeezerSaga() {
  const deezerService: DeezerService = yield getContext(DEEZER_SERVICE_CTX_KEY);

  deezerService.disconnect();
  
  setDeezerConnectedState(false);

  const disconnectAction = setDeezerIsConnected(false);

  yield put(disconnectAction);
}
