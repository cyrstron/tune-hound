import { spawn } from "redux-saga/effects";
import { watchPlayerMute } from "./watch-player-mute";
import { watchPlayerVolume } from "./watch-player-volume";
import { watchPlay } from "./watch-play";
import { watchPause } from "./watch-pause";
import { watchPlayTrack } from "./watch-play-track";
import { watchSeek } from "./watch-seek";

export function* watchPlayerState() {
  yield spawn(watchPlayerMute);
  yield spawn(watchPlayerVolume);
  yield spawn(watchPlay);
  yield spawn(watchPause);
  yield spawn(watchPlayTrack);
  yield spawn(watchSeek);
}