import { fork } from 'redux-saga/effects';
import { watchPlayerMute } from './watch-player-mute';
import { watchPlayerVolume } from './watch-player-volume';
import { watchPlay } from './watch-play';
import { watchPause } from './watch-pause';
import { watchSeek } from './watch-seek';
import { watchCurrentTrack } from './watch-current-track';
import { watchPlayerStateChange } from './listen-player-state';

export function* watchPlayerState(): any {
  yield fork(watchPlayerStateChange);
  yield fork(watchPlayerMute);
  yield fork(watchPlayerMute);
  yield fork(watchPlayerVolume);
  yield fork(watchPlay);
  yield fork(watchPause);
  yield fork(watchCurrentTrack);
  yield fork(watchSeek);
}
