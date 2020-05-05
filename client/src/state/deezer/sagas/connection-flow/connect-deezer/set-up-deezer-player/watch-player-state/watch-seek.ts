import {takeEvery, getContext, select, put} from 'redux-saga/effects';
import { SEEK } from '@app/state/player/consts';
import { DEEZER_SERVICE_CTX_KEY } from '@app/consts';
import { DeezerService } from '@app/state/deezer/services';
import { selectPlayingSource } from '@app/state/player/selectors';
import { SeekAction, setPosition } from '@app/state/player/actions';

export function* watchSeek() {
  yield takeEvery(SEEK, executeSeek);
}

export function* executeSeek({payload: {position}}: SeekAction) {
  const deezerService: DeezerService = yield getContext(DEEZER_SERVICE_CTX_KEY);

  const playingSource = yield select(selectPlayingSource);

  if (playingSource !== 'deezer') return;

  deezerService.player.seek(position);

  const positionAction = setPosition(position);

  yield put(positionAction);
}