import { spawn } from "redux-saga/effects";
import { watchSearch } from "./execute-search";

export function* searchSaga() {
  yield spawn(watchSearch);
}