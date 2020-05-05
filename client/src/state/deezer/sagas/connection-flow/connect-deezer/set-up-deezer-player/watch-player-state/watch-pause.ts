import {takeEvery, getContext, select} from 'redux-saga/effects';
import { PAUSE } from '@app/state/player/consts';
import { DEEZER_SERVICE_CTX_KEY } from '@app/consts';
import { DeezerService } from '@app/state/deezer/services';
import { selectPlayingSource } from '@app/state/player/selectors';

export function* watchPause() {
  yield takeEvery(PAUSE, updatePause)
}

export function* updatePause() {
  const deezerService: DeezerService = yield getContext(DEEZER_SERVICE_CTX_KEY);

  const playingSource = yield select(selectPlayingSource);

  if (playingSource !== 'deezer') return;

  deezerService.player.pause();
}