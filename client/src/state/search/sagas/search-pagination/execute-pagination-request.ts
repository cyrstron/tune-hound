import {all, select, call} from 'redux-saga/effects';
import { selectSearchSource, selectSearchQuery } from '../../selectors';
import { SearchSource, SearchOptions } from '../../types';
import { DeezerSearchOptions } from '@app/state/deezer/types';
import { SpotifySearchOptions } from '@app/state/spotify/types';
import { executeDeezerSearchSaga } from '../execute-search/execute-deezer-search';
import { executeSpotifySearchSaga } from '../execute-search/execute-spotify-search';
import { checkIsRequestNeeded } from './check-request-need';

export function* executeSearchPaginationRequest(pageIndex: number, pageSize: number) {
  const isRequestNeeded: boolean = yield call(checkIsRequestNeeded, pageIndex, pageSize);

  if (!isRequestNeeded) return;

  const [
    searchSource, 
    searchOptions,
  ]: [SearchSource, SearchOptions] = yield all([
    select(selectSearchSource),
    select(selectSearchQuery),
  ]);

  if (searchSource === 'deezer') {
    yield call(executeDeezerSearchSaga, searchOptions as DeezerSearchOptions, pageIndex, pageSize);
  } else if (searchSource === 'spotify') {
    yield call(executeSpotifySearchSaga, searchOptions as SpotifySearchOptions, pageIndex, pageSize);
  }
}