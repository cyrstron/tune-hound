import {eventChannel, EventChannel, END} from 'redux-saga';
import {take, put, select} from 'redux-saga/effects';
import { DeezerService } from '@app/state/deezer/services';
import { deezerTrackEnd } from '@app/state/deezer/actions';
import { selectPlayingSource } from '@app/state/player/selectors';
import { resetCurrentTrack } from '@app/state/player/actions';

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

    const playingSource = yield select(selectPlayingSource);

    if (playingSource !== 'deezer') continue;

    const resetAction = resetCurrentTrack();

    yield put(resetAction);
  }
}
