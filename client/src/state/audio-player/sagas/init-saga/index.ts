import {getContext, takeEvery, call, spawn, put} from 'redux-saga/effects';
import { AudioService } from '../../services/audio-service';
import { AUDIO_SERVICE_CTX_KEY } from '@app/consts';
import { listenAudioEvents } from './listen-service-events';
import { applyPlayerState } from './apply-player-state';
import { watchPlayerState } from './watch-player-state';
import { INIT_APP } from '@app/state/consts';
import { setAudioMounted } from '../../actions';

export function* watchInitAudio() {
  yield takeEvery(INIT_APP, initAudioServiceSaga);
}

function* initAudioServiceSaga() {
  const audioService: AudioService = yield getContext(AUDIO_SERVICE_CTX_KEY);

  yield call(applyPlayerState, audioService);

  yield call(listenAudioEvents, audioService);

  yield spawn(watchPlayerState);

  const mountedAction = setAudioMounted();

  yield put(mountedAction);
}
