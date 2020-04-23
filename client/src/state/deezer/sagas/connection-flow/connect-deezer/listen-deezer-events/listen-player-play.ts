import {eventChannel, EventChannel, END} from 'redux-saga';
import {take, put} from 'redux-saga/effects';
import { DeezerService } from '@app/state/deezer/services';
import { deezerPlay } from '@app/state/deezer/actions';

export function createPlayerPlayChannel(
  deezerService: DeezerService
): EventChannel<void> {
  return eventChannel(emitter => {
    deezerService.events.subscribe('player_play', () => {
      emitter();
    });
      
    return () => {};
  });
}

export function* watchPlayerPlayChange(channel: EventChannel<void>) {
  while (true) {
    const event: undefined | END = yield take(channel);
    
    if (event) return;

    const action = deezerPlay();

    yield put(action);
  }
}
