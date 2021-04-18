import { spawn } from 'redux-saga/effects';

import { deezerSaga } from './deezer';
import { spotifySaga } from './spotify';
import { playerSaga } from './player';
import { audioSaga } from './audio-player';
import { rootSaga } from './root/sagas';

export function* appSaga(): any {
  yield spawn(rootSaga);
  yield spawn(deezerSaga);
  yield spawn(spotifySaga);
  yield spawn(playerSaga);
  yield spawn(audioSaga);
}
