import {takeEvery, getContext, select} from 'redux-saga/effects';
import {PLAY} from '@app/state/player/consts';
import {AUDIO_SERVICE_CTX_KEY} from '@app/consts';
import {selectCurrentTrack} from '@app/state/player/selectors';
import {PlayerTrack} from '@app/state/player/types';
import {AudioService} from '@app/state/audio-player/services/audio-service';
import {selectAudioUrl} from '@app/state/audio-player/selectors';

export function* updatePlay(): any {
  const audioService: AudioService = yield getContext(AUDIO_SERVICE_CTX_KEY);

  const currentTrack: PlayerTrack | undefined = yield select(selectCurrentTrack);

  if (currentTrack?.source !== 'url') return;

  const currentUrl: string | null = yield select(selectAudioUrl);

  if (!currentUrl || currentUrl!== currentTrack.trackSource.url) {
    audioService.setAudio(currentTrack.trackSource.url, true);
  } else {
    audioService.play();
  }
}

export function* watchPlay(): any {
  yield takeEvery(PLAY, updatePlay);
}
