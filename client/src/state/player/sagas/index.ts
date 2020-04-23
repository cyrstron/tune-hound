import { spawn } from "redux-saga/effects";
import { playTrackFlow } from "./play-track";

export function* playerSaga() {
  yield spawn(playTrackFlow);
}