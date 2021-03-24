import { eventChannel, EventChannel, END } from 'redux-saga';
import { take, put } from 'redux-saga/effects';
import { AudioService } from '@app/state/audio-player/services/audio-service';
import { setAudioVolume } from '@app/state/audio-player/actions';

export function createAudioVolumeChannel(audioService: AudioService): EventChannel<number> {
  return eventChannel(emitter => {
    audioService.addEventListener('volumechange', () => {
      emitter(audioService.volume);
    });

    return (): void => {
      return;
    };
  });
}

export function* watchAudioVolumeChange(
  audioService: AudioService,
  channel: EventChannel<number>,
): any {
  const { volume } = audioService;

  const action = setAudioVolume(volume);

  yield put(action);

  while (true) {
    const volume: number | END = yield take(channel);

    if (typeof volume !== 'number') return;

    const action = setAudioVolume(volume);

    yield put(action);
  }
}
