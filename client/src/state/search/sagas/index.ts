import { spawn } from "redux-saga/effects";
import { watchSearch } from "./execute-search";
import { watchSearchPageIndex } from "./set-seach-page";

export function* searchSaga() {
  yield spawn(watchSearch);
  yield spawn(watchSearchPageIndex);
}