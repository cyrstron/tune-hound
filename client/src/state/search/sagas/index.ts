import { spawn } from "redux-saga/effects";
import { watchSearch } from "./execute-search";
import { watchSearchPagination } from "./search-pagination";
import { watchExtendSearchResult } from "./extend-search-result";

export function* searchSaga() {
  yield spawn(watchSearch);
  yield spawn(watchSearchPagination);
  yield spawn(watchExtendSearchResult);
}