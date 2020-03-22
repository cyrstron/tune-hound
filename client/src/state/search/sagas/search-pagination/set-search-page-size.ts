import {call, select} from 'redux-saga/effects';
import { SetSearchPageSizeAction } from "../../actions";
import { selectPageIndex } from '../../selectors';
import { executePaginationSearchRequest } from './execute-pagination-request';

export function* setSearchPageSizeSaga({
  payload: {pageSize},
}: SetSearchPageSizeAction) {
  const pageIndex: number = yield select(selectPageIndex);

  yield call(executePaginationSearchRequest, pageIndex, pageSize);
}