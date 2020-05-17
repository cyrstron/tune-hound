import {takeEvery, getContext, select} from 'redux-saga/effects';
import { PAUSE } from '@app/state/player/consts';
import { AUDIO_SERVICE_CTX_KEY } from '@app/consts';
import { selectPlayingSource } from '@app/state/player/selectors';
import { AudioService } from '@app/state/audio-player/services/audio-service';

export function* watchPause() {
  yield takeEvery(PAUSE, updatePause)
}

export function* updatePause() {
  const audioService: AudioService = yield getContext(AUDIO_SERVICE_CTX_KEY);

  const playingSource = yield select(selectPlayingSource);

  if (playingSource !== 'url') return;

  audioService.pause();
}