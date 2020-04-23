import {eventChannel, EventChannel, END} from 'redux-saga';
import {take, put} from 'redux-saga/effects';
import { DeezerService } from '@app/state/deezer/services';
import { deezerPause } from '@app/state/deezer/actions';

export function createPlayerPauseChannel(
  deezerService: DeezerService
): EventChannel<void> {
  return eventChannel(emitter => {
    deezerService.events.subscribe('player_paused', () => {
      emitter();
    });
      
    return () => {};
  });
}

export function* watchPlayerPauseChange(channel: EventChannel<void>) {
  while (true) {
    const event: undefined | END = yield take(channel);
    
    if (event) return;

    const action = deezerPause();

    yield put(action);
  }
}
