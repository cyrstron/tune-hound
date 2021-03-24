import { takeEvery, getContext, put } from 'redux-saga/effects';
import { SET_CURRENT_TRACK } from '@app/state/player/consts';
import { AUDIO_SERVICE_CTX_KEY } from '@app/consts';
import { SetCurrentTrackAction } from '@app/state/player/actions';
import { AudioService } from '../../../services/audio-service';
import { setAudioError } from '@app/state/audio-player/actions';

export function* setCurrentTrack({ payload: { track, isAutoplay } }: SetCurrentTrackAction): any {
  const audioService: AudioService = yield getContext(AUDIO_SERVICE_CTX_KEY);

  if (track.source !== 'url') return;

  const currentUrl = audioService.currentUrl;

  if (!currentUrl || currentUrl !== track.trackSource.url) {
    try {
      yield audioService.setAudio(track.trackSource.url, isAutoplay);
    } catch (err) {
      const errorAction = setAudioError(err);

      yield put(errorAction);
    }
  } else if (isAutoplay) {
    audioService.seek(0);
    audioService.play();
  } else {
    audioService.seek(0);
    audioService.pause();
  }
}

export function* watchCurrentTrack(): any {
  yield takeEvery(SET_CURRENT_TRACK, setCurrentTrack);
}
