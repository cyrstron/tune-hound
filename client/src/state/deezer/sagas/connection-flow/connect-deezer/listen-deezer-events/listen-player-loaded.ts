import {eventChannel, EventChannel, END} from 'redux-saga';
import {take, put} from 'redux-saga/effects';
import { DeezerService } from '@app/state/deezer/services';
import { setDeezerPlayerLoaded } from '@app/state/deezer/actions';

export function createPlayerLoadedChannel(
  deezerService: DeezerService
): EventChannel<void> {
  return eventChannel(emitter => {
    deezerService.events.subscribe('player_loaded', () => {
      emitter();
    });
      
    return () => {};
  });
}

export function* watchPlayerLoadedChange(channel: EventChannel<void>) {
  while (true) {
    const event: boolean | END = yield take(channel);
    
    if (event) return;

    const action = setDeezerPlayerLoaded();

    yield put(action);
  }
}
