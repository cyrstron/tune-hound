import {eventChannel, EventChannel, END} from 'redux-saga';
import {take, put} from 'redux-saga/effects';
import { DeezerService } from '@app/state/deezer/services';
import { setPlayerRepeatMode } from '@app/state/deezer/actions';

export function createRepeatModeChangeChannel(
  deezerService: DeezerService
): EventChannel<DeezerSdk.RepeatMode> {
  return eventChannel(emitter => {
    deezerService.events.subscribe('repeat_changed', (repeatMode) => {
      emitter(repeatMode);
    });
      
    return () => {};
  });
}

export function* watchRepeatModeChange(channel: EventChannel<DeezerSdk.RepeatMode>) {
  while (true) {
    const repeatMode: DeezerSdk.RepeatMode | END = yield take(channel);
    
    if (typeof repeatMode === 'object') return;

    const action = setPlayerRepeatMode(repeatMode);

    yield put(action);
  }
}
