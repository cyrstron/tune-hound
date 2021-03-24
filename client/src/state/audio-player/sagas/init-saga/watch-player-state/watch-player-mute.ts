import { takeEvery, getContext } from 'redux-saga/effects';
import { SetIsMutedAction } from '@app/state/player/actions';
import { SET_IS_MUTED } from '@app/state/player/consts';
import { AUDIO_SERVICE_CTX_KEY } from '@app/consts';
import { AudioService } from '@app/state/audio-player/services/audio-service';

export function* updatePlayerMute({ payload: { isMuted } }: SetIsMutedAction): any {
  const audioService: AudioService = yield getContext(AUDIO_SERVICE_CTX_KEY);

  audioService.setMute(isMuted);
}

export function* watchPlayerMute(): any {
  yield takeEvery(SET_IS_MUTED, updatePlayerMute);
}
