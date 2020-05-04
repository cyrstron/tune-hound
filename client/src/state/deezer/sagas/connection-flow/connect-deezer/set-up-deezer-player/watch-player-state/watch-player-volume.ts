import {throttle, getContext} from 'redux-saga/effects';
import { SetVolumeAction } from "@app/state/player/actions";
import { SET_VOLUME } from '@app/state/player/consts';
import { DEEZER_SERVICE_CTX_KEY } from '@app/consts';
import { DeezerService } from '@app/state/deezer/services';

export function* watchPlayerVolume() {
  yield throttle(500, SET_VOLUME, updatePlayerVolume)
}

export function* updatePlayerVolume({payload: {volume}}: SetVolumeAction) {
  const deezerService: DeezerService = yield getContext(DEEZER_SERVICE_CTX_KEY);

  deezerService.player.setVolume(volume);
}