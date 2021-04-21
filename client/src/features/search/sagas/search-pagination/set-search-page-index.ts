import { call, select } from 'redux-saga/effects';
import { SetSearchPageIndexAction } from '../../state';
import { selectPageSize } from '../../state/selectors';
import { executePaginationSearchRequest } from './execute-pagination-request';

export function* setSearchPageIndexSaga({ payload: { pageIndex } }: SetSearchPageIndexAction): any {
  const pageSize: number = yield select(selectPageSize);

  yield call(executePaginationSearchRequest, pageIndex, pageSize);
}
