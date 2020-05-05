import {eventChannel, EventChannel, END} from 'redux-saga';
import throttle from 'lodash/throttle';
import {take, put, select, all} from 'redux-saga/effects';
import { DeezerService } from '@app/state/deezer/services';
import { setPlayerPosition } from '@app/state/deezer/actions';
import { selectPlayingSource, selectIsPlaying } from '@app/state/player/selectors';
import { setPosition } from '@app/state/player/actions';
import { PlayerSource } from '@app/state/player/types';

export function createPlayerPositionChannel(
  deezerService: DeezerService
): EventChannel<[number, number]> {
  return eventChannel(emitter => {
    const onPlayerPositionChange = throttle((position) => {
      emitter(position);
    }, 200);

    deezerService.events.subscribe('player_position', onPlayerPositionChange);
      
    return () => {};
  });
}

export function* watchPlayerPositionChange(deezerService: DeezerService, channel: EventChannel<[number, number]>) {
  while (true) {
    const position: [number, number] | END = yield take(channel);
    
    if (!Array.isArray(position)) return;

    const action = setPlayerPosition(position);

    yield put(action);

    const [playingSource, isPlayerPlaying]: [PlayerSource, boolean] = yield all([
      select(selectPlayingSource),
      select(selectIsPlaying),
    ]);

    if (playingSource !== 'deezer' || !isPlayerPlaying) {
      deezerService.player.pause();
    } else {
      const action = setPosition(position[0] / position[1] * 100);

      yield put(action);
    }
  }
}
