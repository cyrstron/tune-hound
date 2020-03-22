import {takeEvery} from 'redux-saga/effects';
import { EXTEND_SEARCH_RESULT } from "../../consts";
import {extendSearchResult} from './extend-search-result';

export function* watchExtendSearchResult() {
  yield takeEvery(EXTEND_SEARCH_RESULT, extendSearchResult);
}
