import { spawn } from "redux-saga/effects";
import { watchSearch } from "./execute-search";
import { watchSearchPagination } from "./search-pagination";

export function* searchSaga() {
  yield spawn(watchSearch);
  yield spawn(watchSearchPagination);
}