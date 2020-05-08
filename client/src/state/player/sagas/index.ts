import { spawn } from "redux-saga/effects";
import { watchPlayNext } from "./play-next-saga";
import { watchSetPlaylist } from "./set-playlist-saga";
import { watchPlayPrev } from "./play-prev-saga";

export function* playerSaga() {
  yield spawn(watchPlayNext);
  yield spawn(watchPlayPrev);
  yield spawn(watchSetPlaylist);
}