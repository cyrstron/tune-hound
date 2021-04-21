import { all, select } from 'redux-saga/effects';
import { selectSearchResults, selectTotalItems } from '../../state/selectors';
import { SearchResult } from '../../state/types';

export function* checkIsRequestNeeded(pageIndex: number, pageSize: number): any {
  const [totalItems, results]: [number, SearchResult[]] = yield all([
    select(selectTotalItems),
    select(selectSearchResults),
  ]);

  if (totalItems < pageIndex * pageSize) return false;

  const requiredPageSize = Math.min(totalItems - pageIndex * pageSize, pageSize);
  const resultsPageSize = results
    ?.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
    .filter(item => !!item).length;

  return resultsPageSize !== requiredPageSize;
}
