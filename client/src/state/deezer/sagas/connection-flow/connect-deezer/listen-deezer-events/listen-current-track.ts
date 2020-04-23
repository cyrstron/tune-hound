import {eventChannel, EventChannel, END} from 'redux-saga';
import {take, put} from 'redux-saga/effects';
import { DeezerService } from '@app/state/deezer/services';
import { setPlayingTrack } from '@app/state/deezer/actions';

export function createCurrentTrackChannel(
  deezerService: DeezerService
): EventChannel<{index: number, track: DeezerSdk.Track}> {
  return eventChannel(emitter => {
    deezerService.events.subscribe('current_track', (event) => {
      emitter(event);
    });
      
    return () => {};
  });
}

export function* watchCurrentTrackChange(channel: EventChannel<{index: number, track: DeezerSdk.Track}>) {
  while (true) {
    const event: {index: number, track: DeezerSdk.Track} | END = yield take(channel);
    
    if ('type' in event) return;

    const {index, track} = event;

    const action = setPlayingTrack(index, track);

    yield put(action);
  }
}
