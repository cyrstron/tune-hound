import {eventChannel, EventChannel, END} from 'redux-saga';
import {take, put} from 'redux-saga/effects';
import { DeezerService } from '@app/state/deezer/services';
import { deezerTrackListChanged } from '@app/state/deezer/actions';

export function createTrackListChannel(
  deezerService: DeezerService
): EventChannel<void> {
  return eventChannel(emitter => {
    deezerService.events.subscribe('tracklist_changed', () => {
      emitter();
    });
      
    return () => {};
  });
}

export function* watchTrackListChange(channel: EventChannel<void>) {
  while (true) {
    const event: undefined | END = yield take(channel);
    
    if (event) return;

    const action = deezerTrackListChanged();

    yield put(action);
  }
}
