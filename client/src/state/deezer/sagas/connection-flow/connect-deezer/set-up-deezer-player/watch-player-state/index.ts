import { spawn } from "redux-saga/effects";
import { watchPlayerMute } from "./watch-player-mute";
import { watchPlayerVolume } from "./watch-player-volume";

export function* watchPlayerState() {
  yield spawn(watchPlayerMute);
  yield spawn(watchPlayerVolume);
}