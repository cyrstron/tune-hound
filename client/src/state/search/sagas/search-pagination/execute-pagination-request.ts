import { all, select, call } from 'redux-saga/effects';
import { selectSearchSource, selectSearchQuery } from '../../selectors';
import { SearchSource, SearchOptions } from '../../types';
import { executeSearchRequest } from '../execute-search-request';
import { checkIsRequestNeeded } from './check-request-need';
import { updatePageParamsSaga } from '../update-page-params';

export function* executePaginationSearchRequest(pageIndex: number, pageSize: number): any {
  const isRequestNeeded: boolean = yield call(checkIsRequestNeeded, pageIndex, pageSize);

  if (!isRequestNeeded) {
    yield call(updatePageParamsSaga, pageIndex, pageSize);
  } else {
    const [searchSource, searchOptions]: [SearchSource, SearchOptions] = yield all([
      select(selectSearchSource),
      select(selectSearchQuery),
    ]);

    yield call(executeSearchRequest, searchSource, searchOptions, pageIndex, pageSize);
  }
}
