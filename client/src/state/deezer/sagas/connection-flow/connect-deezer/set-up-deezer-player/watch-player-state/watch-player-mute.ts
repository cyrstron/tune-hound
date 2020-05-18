import {takeEvery, getContext} from 'redux-saga/effects';
import {SetIsMutedAction} from '@app/state/player/actions';
import {SET_IS_MUTED} from '@app/state/player/consts';
import {DEEZER_SERVICE_CTX_KEY} from '@app/consts';
import {DeezerService} from '@app/state/deezer/services';

export function* updatePlayerMute(
  {payload: {isMuted}}: SetIsMutedAction,
): any {
  const deezerService: DeezerService = yield getContext(DEEZER_SERVICE_CTX_KEY);

  deezerService.player.setMute(isMuted);
}

export function* watchPlayerMute(): any {
  yield takeEvery(SET_IS_MUTED, updatePlayerMute);
}
