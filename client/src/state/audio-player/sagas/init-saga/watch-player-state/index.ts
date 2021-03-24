import { spawn } from 'redux-saga/effects';
import { watchPlayerMute } from './watch-player-mute';
import { watchPlayerVolume } from './watch-player-volume';
import { watchPlay } from './watch-play';
import { watchPause } from './watch-pause';
import { watchSeek } from './watch-seek';
import { watchCurrentTrack } from './watch-current-track';

export function* watchPlayerState(): any {
  yield spawn(watchPlayerMute);
  yield spawn(watchPlayerVolume);
  yield spawn(watchPlay);
  yield spawn(watchPause);
  yield spawn(watchCurrentTrack);
  yield spawn(watchSeek);
}
