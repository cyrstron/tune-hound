import { call, select } from 'redux-saga/effects';
import { SetSearchPageSizeAction } from '../../../../../state/search/actions';
import { selectPageIndex } from '../../../../../state/search/selectors';
import { executePaginationSearchRequest } from './execute-pagination-request';

export function* setSearchPageSizeSaga({ payload: { pageSize } }: SetSearchPageSizeAction): any {
  const pageIndex: number = yield select(selectPageIndex);

  yield call(executePaginationSearchRequest, pageIndex, pageSize);
}
