import {eventChannel, EventChannel, END} from 'redux-saga';
import {take, put, all, select} from 'redux-saga/effects';
import {DeezerService} from '@app/state/deezer/services';
import {setDeezerIsPlaying} from '@app/state/deezer/actions';
import {PlayerTrack} from '@app/state/player/types';
import {selectIsPlaying, selectCurrentTrack} from '@app/state/player/selectors';
import {setIsPlaying} from '@app/state/player/actions';
import {selectDeezerCurrentTrack} from '@app/state/deezer/selectors';

export function createPlayerPauseChannel(
  deezerService: DeezerService,
): EventChannel<false> {
  return eventChannel((emitter) => {
    deezerService.events.subscribe('player_paused', () => {
      emitter(false);
    });

    return (): void => {
      return;
    };
  });
}

export function* watchPlayerPauseChange(channel: EventChannel<false>): any {
  while (true) {
    const isPlaying: boolean | END = yield take(channel);

    if (typeof isPlaying === 'object') return;

    const action = setDeezerIsPlaying(isPlaying);

    yield put(action);

    const [currentTrack, isPlayerPlaying, playingTrack]: [
      PlayerTrack | undefined,
      boolean,
      DeezerSdk.Track | null
    ] = yield all([
      select(selectCurrentTrack),
      select(selectIsPlaying),
      select(selectDeezerCurrentTrack),
    ]);

    const isCurrentTrackSet = currentTrack?.source === 'deezer' &&
      playingTrack && +playingTrack.id === currentTrack.trackSource.id;

    if (!isCurrentTrackSet || !isPlayerPlaying) continue;

    const pauseAction = setIsPlaying(isPlaying);

    yield put(pauseAction);
  }
}
