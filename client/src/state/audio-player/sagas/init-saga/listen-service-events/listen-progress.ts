import {eventChannel, EventChannel, END} from 'redux-saga';
import {take, put} from 'redux-saga/effects';
import {AudioService} from '@app/state/audio-player';
import {setAudioProgress} from '../../../actions';

export function createAudioProgressChannel(
  audioService: AudioService,
): EventChannel<[number, number][]> {
  return eventChannel((emitter) => {
    audioService.addEventListener('progress', () => {
      emitter(audioService.buffered);
    });

    return (): void => {
      return;
    };
  });
}

export function* watchAudioProgressChange(channel: EventChannel<[number, number][]>): any {
  while (true) {
    const progress: [number, number][] | END = yield take(channel);

    if (typeof progress !== 'number') return;

    const action = setAudioProgress(progress);

    yield put(action);
  }
}
