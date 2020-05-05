import {eventChannel, EventChannel, END} from 'redux-saga';
import {take, put, all, select} from 'redux-saga/effects';
import { DeezerService } from '@app/state/deezer/services';
import { setDeezerIsPlaying } from '@app/state/deezer/actions';
import { PlayerSource } from '@app/state/player/types';
import { selectPlayingSource, selectIsPlaying } from '@app/state/player/selectors';
import { setIsPlaying } from '@app/state/player/actions';

export function createPlayerPauseChannel(
  deezerService: DeezerService
): EventChannel<false> {
  return eventChannel(emitter => {
    deezerService.events.subscribe('player_paused', () => {
      emitter(false);
    });
      
    return () => {};
  });
}

export function* watchPlayerPauseChange(channel: EventChannel<false>) {
  while (true) {
    const isPlaying: boolean | END = yield take(channel);
    
    if (typeof isPlaying === 'object') return;

    const action = setDeezerIsPlaying(isPlaying);

    yield put(action);

    const [playingSource, isPlayerPlaying]: [PlayerSource, boolean] = yield all([
      select(selectPlayingSource),
      select(selectIsPlaying),
    ]);

    if (playingSource !== 'deezer' || !isPlayerPlaying) continue;

    const pauseAction = setIsPlaying(isPlaying);

    yield put(pauseAction);
  }
}
