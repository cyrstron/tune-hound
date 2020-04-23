import {eventChannel, EventChannel, END} from 'redux-saga';
import {take, put} from 'redux-saga/effects';
import { DeezerService } from '@app/state/deezer/services';
import { deezerTrackListChanged } from '@app/state/deezer/actions';

export function createTrackListChannel(
  deezerService: DeezerService
): EventChannel<true> {
  return eventChannel(emitter => {
    deezerService.events.subscribe('tracklist_changed', () => {
      emitter(true);
    });
      
    return () => {};
  });
}

export function* watchTrackListChange(channel: EventChannel<true>) {
  while (true) {
    const event: boolean | END = yield take(channel);
    
    if (typeof event === 'object') return;

    const action = deezerTrackListChanged();

    yield put(action);
  }
}
