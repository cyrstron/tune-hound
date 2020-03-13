import {call, takeEvery, select} from 'redux-saga/effects';
import { EXECUTE_SEARCH } from "../consts";
import { ExecuteSearchAction } from '../actions';
import { selectPageSize } from '../selectors';
import { executeSearchRequest } from './execute-search-request';

export function* watchSearch() {
  yield takeEvery(EXECUTE_SEARCH, executeSearchSaga);
}

export function* executeSearchSaga({
  payload: {source, options},
}: ExecuteSearchAction) {
  const pageSize = yield select(selectPageSize);

  yield call(executeSearchRequest, source, options, 0, pageSize);
}
