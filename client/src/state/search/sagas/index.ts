import { spawn } from "redux-saga/effects";
import { watchSearch } from "./execure-search";

export function* searchSaga() {
  yield spawn(watchSearch);
}