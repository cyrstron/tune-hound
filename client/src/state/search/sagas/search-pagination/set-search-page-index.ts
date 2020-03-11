import {call, select} from 'redux-saga/effects';
import { SetSearchPageIndexAction } from "../../actions";
import { selectPageSize } from '../../selectors';
import { executeSearchPaginationRequest } from './execute-pagination-request';

export function* setSearchPageIndexSaga({
  payload: {pageIndex},
}: SetSearchPageIndexAction) {
  const pageSize: number = yield select(selectPageSize);

  yield call(executeSearchPaginationRequest, pageIndex, pageSize);
}
