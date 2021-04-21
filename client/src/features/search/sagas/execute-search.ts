import { call, takeEvery, select } from 'redux-saga/effects';
import { ExecuteSearchAction } from '../state';
import { EXECUTE_SEARCH } from '../state/consts';
import { selectPageSize } from '../state/selectors';
import { executeSearchRequest } from './execute-search-request';

export function* executeSearchSaga({ payload: { source, options } }: ExecuteSearchAction): any {
  const pageSize = yield select(selectPageSize);

  yield call(executeSearchRequest, source, options, 0, pageSize, true);
}

export function* watchSearch(): any {
  yield takeEvery(EXECUTE_SEARCH, executeSearchSaga);
}
