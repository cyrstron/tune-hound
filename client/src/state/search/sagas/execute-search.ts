import {call, takeEvery} from 'redux-saga/effects';
import { EXECUTE_SEARCH } from "../consts";
import { ExecuteSearchAction } from '../actions';
import { executeSearchRequest } from './execute-search-request';

export function* watchSearch() {
  yield takeEvery(EXECUTE_SEARCH, executeSearchSaga);
}

export function* executeSearchSaga({
  payload: {source, options},
}: ExecuteSearchAction) {
  yield call(executeSearchRequest, source, options, 0, 0);
}
