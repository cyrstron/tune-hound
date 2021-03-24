import { eventChannel, EventChannel, END } from 'redux-saga';
import { take, put, select } from 'redux-saga/effects';
import { DeezerService } from '@app/state/deezer/services';
import { setPlayingTrack } from '@app/state/deezer/actions';
import { selectCurrentTrack } from '@app/state/player/selectors';
import { PlayerTrack } from '@app/state/player/types';

export function createCurrentTrackChannel(
  deezerService: DeezerService,
): EventChannel<{ index: number; track: DeezerSdk.Track }> {
  return eventChannel(emitter => {
    deezerService.events.subscribe('current_track', event => {
      emitter(event);
    });

    return (): void => {
      return;
    };
  });
}

export function* watchCurrentTrackChange(
  deezerService: DeezerService,
  channel: EventChannel<{ index: number; track: DeezerSdk.Track }>,
): any {
  const track = deezerService.player.getCurrentTrack();
  const index = deezerService.player.getCurrentIndex();

  const action = setPlayingTrack(index, track);

  yield put(action);

  while (true) {
    const event: { index: number; track: DeezerSdk.Track } | END = yield take(channel);

    if ('type' in event) return;

    const { index, track } = event;

    const action = setPlayingTrack(index, track);

    yield put(action);

    const currentTrack: PlayerTrack = yield select(selectCurrentTrack);

    if (
      currentTrack &&
      currentTrack.source === 'deezer' &&
      currentTrack.trackSource.id === +track.id
    )
      continue;

    deezerService.player.pause();
  }
}
