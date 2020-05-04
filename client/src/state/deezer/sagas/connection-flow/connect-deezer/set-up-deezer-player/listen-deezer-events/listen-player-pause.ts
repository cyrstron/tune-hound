import {eventChannel, EventChannel, END} from 'redux-saga';
import {take, put} from 'redux-saga/effects';
import { DeezerService } from '@app/state/deezer/services';
import { setDeezerIsPlaying } from '@app/state/deezer/actions';

export function createPlayerPauseChannel(
  deezerService: DeezerService
): EventChannel<false> {
  return eventChannel(emitter => {
    deezerService.events.subscribe('player_paused', () => {
      emitter(false);
    });
      
    return () => {};
  });
}

export function* watchPlayerPauseChange(channel: EventChannel<false>) {
  while (true) {
    const isPlaying: boolean | END = yield take(channel);
    
    if (typeof isPlaying === 'object') return;

    const action = setDeezerIsPlaying(isPlaying);

    yield put(action);
  }
}
