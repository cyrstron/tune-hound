import { takeEvery, getContext, select } from 'redux-saga/effects';
import { SEEK } from '@app/state/player/consts';
import { DEEZER_SERVICE_CTX_KEY } from '@app/consts';
import { DeezerService } from '@app/state/deezer/services';
import { selectPlayingSource } from '@app/state/player/selectors';
import { SeekAction } from '@app/state/player/actions';

export function* executeSeek({ payload: { position } }: SeekAction): any {
  const deezerService: DeezerService = yield getContext(DEEZER_SERVICE_CTX_KEY);

  const playingSource = yield select(selectPlayingSource);

  if (playingSource !== 'deezer') return;

  deezerService.player.seek(position);
}

export function* watchSeek(): any {
  yield takeEvery(SEEK, executeSeek);
}
