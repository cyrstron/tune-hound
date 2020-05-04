import {eventChannel, EventChannel, END} from 'redux-saga';
import {take, put} from 'redux-saga/effects';
import { DeezerService } from '@app/state/deezer/services';
import { setPlayerShuffle } from '@app/state/deezer/actions';

export function createShuffleModeChannel(
  deezerService: DeezerService
): EventChannel<boolean> {
  return eventChannel(emitter => {
    deezerService.events.subscribe('shuffle_changed', (isShuffled) => {
      emitter(isShuffled);
    });
      
    return () => {};
  });
}

export function* watchShuffleModeChange(deezerService: DeezerService, channel: EventChannel<boolean>) {
  const isShuffled = deezerService.player.getShuffle();

  const action = setPlayerShuffle(isShuffled);

  yield put(action);

  while (true) {
    const isShuffled: boolean | END = yield take(channel);
    
    if (typeof isShuffled === 'object') return;

    const action = setPlayerShuffle(isShuffled);

    yield put(action);
  }
}
