import {eventChannel, EventChannel, END} from 'redux-saga';
import {take, put} from 'redux-saga/effects';
import { DeezerService } from '@app/state/deezer/services';
import { setPlayerPosition } from '@app/state/deezer/actions';

export function createPlayerPositionChannel(
  deezerService: DeezerService
): EventChannel<[number, number]> {
  return eventChannel(emitter => {
    deezerService.events.subscribe('player_position', (position) => {
      emitter(position);
    });
      
    return () => {};
  });
}

export function* watchPlayerPositionChange(channel: EventChannel<[number, number]>) {
  while (true) {
    const position: [number, number] | END = yield take(channel);
    
    if (!Array.isArray(position)) return;

    const action = setPlayerPosition(position);

    yield put(action);
  }
}
