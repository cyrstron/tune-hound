import {eventChannel, EventChannel, END} from 'redux-saga';
import {take, put} from 'redux-saga/effects';
import { DeezerService } from '@app/state/deezer/services';
import { setDeezerIsPlaying } from '@app/state/deezer/actions';

export function createPlayerPlayChannel(
  deezerService: DeezerService
): EventChannel<true> {
  return eventChannel(emitter => {
    deezerService.events.subscribe('player_play', () => {
      emitter(true);
    });
      
    return () => {};
  });
}

export function* watchPlayerPlayChange(channel: EventChannel<true>) {
  while (true) {
    const isPlaying: true | END = yield take(channel);
    
    if (typeof isPlaying === 'object') return;

    const action = setDeezerIsPlaying(isPlaying);

    yield put(action);
  }
}
