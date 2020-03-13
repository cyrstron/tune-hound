import {all, select} from 'redux-saga/effects';
import { SearchResult } from "../../types";
import { selectTotalItems, selectSearchResult } from "../../selectors";

export function* checkIsRequestNeeded(pageIndex: number, pageSize: number) {
  const [
    totalItems,
    results
  ]: [number, SearchResult[]] = yield all([
    select(selectTotalItems),
    select(selectSearchResult),
  ]);

  if (totalItems < (pageIndex * pageSize)) return false;

  const requiredPageSize = Math.min(totalItems - pageIndex * pageSize, pageSize);
  const resultsPageSize = results.slice(
    (pageIndex * pageSize), 
    (pageIndex + 1) * pageSize
  ).length;

  return resultsPageSize !== requiredPageSize;
}
