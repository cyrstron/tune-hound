import {eventChannel, EventChannel, END} from 'redux-saga';
import {take, put} from 'redux-saga/effects';
import { DeezerService } from '@app/state/deezer/services';
import { setIsPlayerMuted } from '@app/state/deezer/actions';

export function createMuteChangeChannel(
  deezerService: DeezerService
): EventChannel<boolean> {
  return eventChannel(emitter => {
    deezerService.events.subscribe('mute_changed', (isMuted) => {
      emitter(isMuted);
    });
      
    return () => {};
  });
}

export function* watchMuteChange(channel: EventChannel<boolean>) {
  while (true) {
    const isMuted: boolean | END = yield take(channel);
    
    if (typeof isMuted !== 'boolean') return;

    const action = setIsPlayerMuted(isMuted);

    yield put(action);
  }
}
