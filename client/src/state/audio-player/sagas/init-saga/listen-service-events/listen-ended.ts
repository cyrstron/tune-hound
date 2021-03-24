import { eventChannel, EventChannel, END } from 'redux-saga';
import { take, put, select } from 'redux-saga/effects';
import { selectPlayingSource } from '@app/state/player/selectors';
import { playNext } from '@app/state/player/actions';
import { AudioService } from '@app/state/audio-player/services/audio-service';

export function createEndedChannel(audioService: AudioService): EventChannel<true> {
  return eventChannel(emitter => {
    audioService.addEventListener('ended', () => {
      emitter(true);
    });

    return (): void => {
      return;
    };
  });
}

export function* watchEnded(audioService: AudioService, channel: EventChannel<true>): any {
  while (true) {
    const trackIndex: number | END = yield take(channel);

    if (typeof trackIndex === 'object') return;

    const playingSource = yield select(selectPlayingSource);

    if (playingSource !== 'url') continue;

    audioService.pause();

    const nextAction = playNext();

    yield put(nextAction);
  }
}
