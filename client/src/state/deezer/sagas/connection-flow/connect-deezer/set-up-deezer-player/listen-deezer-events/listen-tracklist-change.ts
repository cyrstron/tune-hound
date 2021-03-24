import { eventChannel, EventChannel, END } from 'redux-saga';
import { take, put } from 'redux-saga/effects';
import { DeezerService } from '@app/state/deezer/services';
import { deezerTrackListChanged } from '@app/state/deezer/actions';

export function createTrackListChannel(deezerService: DeezerService): EventChannel<true> {
  return eventChannel(emitter => {
    deezerService.events.subscribe('tracklist_changed', () => {
      emitter(true);
    });

    return (): void => {
      return;
    };
  });
}

export function* watchTrackListChange(
  deezerService: DeezerService,
  channel: EventChannel<true>,
): any {
  const trackList = deezerService.player.getTrackList();

  const action = deezerTrackListChanged(trackList);

  yield put(action);

  while (true) {
    const event: boolean | END = yield take(channel);

    if (typeof event === 'object') return;

    const trackList = deezerService.player.getTrackList();

    const action = deezerTrackListChanged(trackList);

    yield put(action);
  }
}
