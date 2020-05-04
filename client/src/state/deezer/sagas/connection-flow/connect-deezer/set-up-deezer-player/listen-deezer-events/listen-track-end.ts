import {eventChannel, EventChannel, END} from 'redux-saga';
import {take, put} from 'redux-saga/effects';
import { DeezerService } from '@app/state/deezer/services';
import { deezerTrackEnd } from '@app/state/deezer/actions';

export function createTrackEndChannel(
  deezerService: DeezerService
): EventChannel<number> {
  return eventChannel(emitter => {
    deezerService.events.subscribe('track_end', (trackIndex) => {
      emitter(trackIndex);
    });
      
    return () => {};
  });
}

export function* watchTrackEnd(channel: EventChannel<number>) {
  while (true) {
    const trackIndex: number | END = yield take(channel);
    
    if (typeof trackIndex === 'object') return;

    const action = deezerTrackEnd(trackIndex);

    yield put(action);
  }
}
