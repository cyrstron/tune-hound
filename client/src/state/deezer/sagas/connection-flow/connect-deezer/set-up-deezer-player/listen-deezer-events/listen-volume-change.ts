import {eventChannel, EventChannel, END} from 'redux-saga';
import {take, put} from 'redux-saga/effects';
import {DeezerService} from '@app/state/deezer/services';
import {deezerVolumeChanged} from '@app/state/deezer/actions';

export function createPlayerVolumeChannel(
  deezerService: DeezerService,
): EventChannel<number> {
  return eventChannel((emitter) => {
    deezerService.events.subscribe('volume_changed', (volume) => {
      emitter(volume);
    });

    return (): void => {
      return;
    };
  });
}

export function* watchPlayerVolumeChange(
  deezerService: DeezerService,
  channel: EventChannel<number>,
): any {
  const volume = deezerService.player.getVolume();

  const action = deezerVolumeChanged(volume);

  yield put(action);

  while (true) {
    const volume: number | END = yield take(channel);

    if (typeof volume !== 'number') return;

    const action = deezerVolumeChanged(volume);

    yield put(action);
  }
}
