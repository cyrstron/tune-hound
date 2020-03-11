import {all, select, call} from 'redux-saga/effects';
import { selectSearchSource, selectSearchQuery } from '../../selectors';
import { SearchSource, SearchOptions } from '../../types';
import { executeSearchRequest } from '../execute-search-request';
import { checkIsRequestNeeded } from './check-request-need';

export function* executePaginationSearchRequest(pageIndex: number, pageSize: number) {
  const isRequestNeeded: boolean = yield call(checkIsRequestNeeded, pageIndex, pageSize);

  if (!isRequestNeeded) return;

  const [
    searchSource, 
    searchOptions,
  ]: [SearchSource, SearchOptions] = yield all([
    select(selectSearchSource),
    select(selectSearchQuery),
  ]);

  yield call(
    executeSearchRequest, 
    searchSource, 
    searchOptions, 
    pageIndex, 
    pageSize
  );
}