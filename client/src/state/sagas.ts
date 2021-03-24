import { spawn } from 'redux-saga/effects';

import { deezerSaga } from './deezer';
import { searchSaga } from './search';
import { spotifySaga } from './spotify';
import { playerSaga } from './player';
import { audioSaga } from './audio-player';

export function* rootSaga(): any {
  yield spawn(deezerSaga);
  yield spawn(spotifySaga);
  yield spawn(searchSaga);
  yield spawn(playerSaga);
  yield spawn(audioSaga);
}
