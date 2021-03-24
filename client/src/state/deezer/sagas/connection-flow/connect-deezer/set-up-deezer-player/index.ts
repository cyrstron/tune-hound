import { call, spawn } from 'redux-saga/effects';
import { DeezerService } from '@app/state/deezer/services';
import { listenDeezerEvents } from './listen-deezer-events';
import { applyPlayerState } from './apply-player-state';
import { watchPlayerState } from './watch-player-state';

export function* setUpDeezerPlayer(deezerService: DeezerService): any {
  yield call(applyPlayerState, deezerService);

  yield call(listenDeezerEvents, deezerService);

  yield spawn(watchPlayerState);
}
