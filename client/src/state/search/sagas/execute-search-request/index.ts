import {call, put, all, select} from 'redux-saga/effects';
import { SearchSource, SearchOptions, SearchResult } from '../../types';
import { DeezerSearchOptions } from '@app/state/deezer/types';
import { SpotifySearchOptions } from '@app/state/spotify/types';
import { executeDeezerSearchSaga } from './execute-deezer-search';
import { executeSpotifySearchSaga } from './execute-spotify-search';
import { 
  executeSearchPending, 
  executeSearchSuccess, 
  executeSearchFailure,
  resetSearchResults,
} from '../../actions';
import { updatePageParamsSaga } from '../update-page-params';

export function* executeSearchRequest(
  searchSource:SearchSource, 
  searchOptions: SearchOptions, 
  pageIndex: number, 
  pageSize: number,
  withReset: boolean = false,
) {
  const pendingAction = executeSearchPending();

  yield put(pendingAction);

  try {
    let response: {
      total: number,
      results: SearchResult[],
    } = {total: 0, results: []};

    if (searchSource === 'deezer') {
      response = yield call(executeDeezerSearchSaga, searchOptions as DeezerSearchOptions, pageIndex, pageSize);
    } else if (searchSource === 'spotify') {
      response = yield call(executeSpotifySearchSaga, searchOptions as SpotifySearchOptions, pageIndex, pageSize);
    }

    if (withReset) {
      yield put(resetSearchResults());
    } 
    
    yield call(updatePageParamsSaga, pageIndex, pageSize);

    const {results, total} = response;

    const successAction = executeSearchSuccess(results, total);

    yield put(successAction);
  } catch (err) {
    const failureAction = executeSearchFailure(err);

    yield put(failureAction);
  }
}