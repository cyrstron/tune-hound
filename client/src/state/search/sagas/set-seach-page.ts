import {call, takeEvery, all, select} from 'redux-saga/effects';
import { SET_SEARCH_PAGE_INDEX } from "../consts";
import { SetSearchPageIndexAction } from '../actions';
import { executeDeezerSearchSaga } from './execute-search/execute-deezer-search';
import { executeSpotifySearchSaga } from './execute-search/execute-spotify-search';
import { DeezerSearchOptions } from '@app/state/deezer/types';
import { SpotifySearchOptions } from '@app/state/spotify/types';
import { 
  selectPageSize, 
  selectSearchQuery, 
  selectSearchSource, 
  selectTotalItems, 
  selectSearchResult,
} from '../selectors';
import { SearchOptions, SearchSource, SearchResult } from '../types';

export function* watchSearchPageIndex() {
  yield takeEvery(SET_SEARCH_PAGE_INDEX, setSearchPageIndexSaga);
}

export function* setSearchPageIndexSaga({
  payload: {pageIndex},
}: SetSearchPageIndexAction) {
  const [
    totalItems,
    pageSize, 
    searchSource, 
    searchOptions,
    results
  ]: [number, number, SearchSource, SearchOptions, SearchResult[]] = yield all([
    select(selectTotalItems),
    select(selectPageSize),
    select(selectSearchSource),
    select(selectSearchQuery),
    select(selectSearchResult),
  ]);

  if (totalItems < (pageIndex * pageSize)) return;

  const requiredPageSize = Math.min(totalItems - pageIndex * pageSize, pageSize);
  const resultsPageSize = results.slice(
    (pageIndex * pageSize), 
    (pageIndex + 1) * pageSize
  ).length;

  if (resultsPageSize === requiredPageSize) return;

  if (searchSource === 'deezer') {
    yield call(executeDeezerSearchSaga, searchOptions as DeezerSearchOptions, pageIndex, pageSize);
  } else if (searchSource === 'spotify') {
    yield call(executeSpotifySearchSaga, searchOptions as SpotifySearchOptions, pageIndex, pageSize);
  }
}
