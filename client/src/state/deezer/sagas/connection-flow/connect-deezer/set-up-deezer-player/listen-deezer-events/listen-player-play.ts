import { eventChannel, EventChannel, END } from 'redux-saga';
import { take, put, select, all } from 'redux-saga/effects';
import { DeezerService } from '@app/state/deezer/services';
import { setDeezerIsPlaying } from '@app/state/deezer/actions';
import { selectIsPlaying, selectCurrentTrack } from '@app/state/player/selectors';
import { PlayerTrack } from '@app/state/player/types';
import { setIsPlaying } from '@app/state/player/actions';
import { selectDeezerCurrentTrack } from '@app/state/deezer/selectors';

export function createPlayerPlayChannel(deezerService: DeezerService): EventChannel<true> {
  return eventChannel(emitter => {
    deezerService.events.subscribe('player_play', () => {
      emitter(true);
    });

    return (): void => {
      return;
    };
  });
}

export function* watchPlayerPlayChange(
  deezerService: DeezerService,
  channel: EventChannel<true>,
): any {
  while (true) {
    const isPlaying: true | END = yield take(channel);

    if (typeof isPlaying === 'object') return;

    const action = setDeezerIsPlaying(isPlaying);

    yield put(action);

    const [currentTrack, isPlayerPlaying, playingTrack]: [
      PlayerTrack | undefined,
      boolean,
      DeezerSdk.Track | null,
    ] = yield all([
      select(selectCurrentTrack),
      select(selectIsPlaying),
      select(selectDeezerCurrentTrack),
    ]);

    const isCurrentTrackSet =
      currentTrack?.source === 'deezer' &&
      playingTrack &&
      +playingTrack.id === currentTrack.trackSource.id;

    if (isCurrentTrackSet && isPlayerPlaying) continue;

    if (!isCurrentTrackSet) {
      deezerService.player.pause();
    } else {
      const action = setIsPlaying(isPlaying);

      yield put(action);
    }
  }
}
