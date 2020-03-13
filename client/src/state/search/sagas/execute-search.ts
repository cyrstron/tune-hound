import {call, takeEvery, select, put} from 'redux-saga/effects';
import { EXECUTE_SEARCH } from "../consts";
import { ExecuteSearchAction, setSearchPageIndex } from '../actions';
import { selectPageSize } from '../selectors';
import { executeSearchRequest } from './execute-search-request';

export function* watchSearch() {
  yield takeEvery(EXECUTE_SEARCH, executeSearchSaga);
}

export function* executeSearchSaga({
  payload: {source, options},
}: ExecuteSearchAction) {
  yield put(setSearchPageIndex(0));

  const pageSize = yield select(selectPageSize);

  yield call(executeSearchRequest, source, options, 0, pageSize);
}
