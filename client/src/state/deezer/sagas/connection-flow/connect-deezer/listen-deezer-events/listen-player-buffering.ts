import {eventChannel, EventChannel, END} from 'redux-saga';
import {take, put} from 'redux-saga/effects';
import { DeezerService } from '@app/state/deezer/services';
import { setPlayerBuffering } from '@app/state/deezer/actions';

export function createPlayerBufferingChannel(
  deezerService: DeezerService
): EventChannel<number> {
  return eventChannel(emitter => {
    deezerService.events.subscribe('player_buffering', (buffered) => {
      emitter(buffered);
    });
      
    return () => {};
  });
}

export function* watchPlayerBufferingChange(channel: EventChannel<number>) {
  while (true) {
    const buffered: boolean | END = yield take(channel);
    
    if (typeof buffered !== 'number') return;

    const action = setPlayerBuffering(buffered);

    yield put(action);
  }
}
