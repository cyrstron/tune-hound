import { eventChannel, EventChannel, END } from 'redux-saga';
import { take, put } from 'redux-saga/effects';
import { DeezerService } from '@app/state/deezer/services';
import { setDeezerPlayerLoaded } from '@app/state/deezer/actions';

export function createPlayerLoadedChannel(deezerService: DeezerService): EventChannel<true> {
  return eventChannel(emitter => {
    deezerService.events.subscribe('player_loaded', () => {
      emitter(true);
    });

    return (): void => {
      return;
    };
  });
}

export function* watchPlayerLoadedChange(channel: EventChannel<true>): any {
  while (true) {
    const isLoaded: boolean | END = yield take(channel);

    if (typeof isLoaded === 'object') return;

    const action = setDeezerPlayerLoaded();

    yield put(action);
  }
}
