import { throttle, getContext } from 'redux-saga/effects';
import { SetVolumeAction } from '@app/state/player/actions';
import { SET_VOLUME } from '@app/state/player/consts';
import { AUDIO_SERVICE_CTX_KEY } from '@app/consts';
import { AudioService } from '@app/state/audio-player/services/audio-service';

export function* updatePlayerVolume({ payload: { volume } }: SetVolumeAction): any {
  const audioService: AudioService = yield getContext(AUDIO_SERVICE_CTX_KEY);

  audioService.setVolume(volume / 100);
}

export function* watchPlayerVolume(): any {
  yield throttle(500, SET_VOLUME, updatePlayerVolume);
}
