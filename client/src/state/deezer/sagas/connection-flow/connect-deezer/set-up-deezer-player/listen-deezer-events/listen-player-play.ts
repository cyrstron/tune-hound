import {eventChannel, EventChannel, END} from 'redux-saga';
import {take, put, select, all} from 'redux-saga/effects';
import { DeezerService } from '@app/state/deezer/services';
import { setDeezerIsPlaying } from '@app/state/deezer/actions';
import { selectPlayingSource, selectIsPlaying } from '@app/state/player/selectors';
import { PlayerSource } from '@app/state/player/types';
import { setIsPlaying } from '@app/state/player/actions';

export function createPlayerPlayChannel(
  deezerService: DeezerService
): EventChannel<true> {
  return eventChannel(emitter => {
    deezerService.events.subscribe('player_play', () => {
      emitter(true);
    });
      
    return () => {};
  });
}

export function* watchPlayerPlayChange(deezerService: DeezerService, channel: EventChannel<true>) {
  while (true) {
    const isPlaying: true | END = yield take(channel);
    
    if (typeof isPlaying === 'object') return;

    const action = setDeezerIsPlaying(isPlaying);

    yield put(action);

    const [playingSource, isPlayerPlaying]: [PlayerSource, boolean] = yield all([
      select(selectPlayingSource),
      select(selectIsPlaying),
    ]);

    if (playingSource === 'deezer' && isPlayerPlaying) continue;

    if (playingSource && playingSource !== 'deezer') {
      deezerService.player.pause();
    } else {
      const action = setIsPlaying(isPlaying);

      yield put(action);
    }
  }
}
