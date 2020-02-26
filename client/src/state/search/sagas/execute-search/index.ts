import {call, takeEvery} from 'redux-saga/effects';
import { EXECUTE_SEARCH } from "../../consts";
import { ExecuteSearchAction } from '../../actions';
import { executeDeezerSearchSaga } from './execute-deezer-search';

export function* watchSearch() {
  yield takeEvery(EXECUTE_SEARCH, executeSearchSaga);
}

export function* executeSearchSaga({
  payload: {source, query, options},
}: ExecuteSearchAction) {
  if (source === 'deezer') {
    yield call(executeDeezerSearchSaga, query, options);
  }
}