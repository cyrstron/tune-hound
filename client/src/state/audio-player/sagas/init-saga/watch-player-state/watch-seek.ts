import {takeEvery, getContext, select} from 'redux-saga/effects';
import {SEEK} from '@app/state/player/consts';
import {AUDIO_SERVICE_CTX_KEY} from '@app/consts';
import {selectCurrentTrack} from '@app/state/player/selectors';
import {SeekAction} from '@app/state/player/actions';
import {AudioService} from '@app/state/audio-player/services/audio-service';

export function* executeSeek({payload: {position}}: SeekAction): any {
  const audioService: AudioService = yield getContext(AUDIO_SERVICE_CTX_KEY);

  const currentTrack = yield select(selectCurrentTrack);

  if (currentTrack?.source !== 'url') return;

  yield audioService.seek(position * currentTrack.duration / 100);

  audioService.play();
}

export function* watchSeek(): any {
  yield takeEvery(SEEK, executeSeek);
}
