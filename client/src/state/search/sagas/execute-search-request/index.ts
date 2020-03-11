import {call} from 'redux-saga/effects';
import { SearchSource, SearchOptions } from '../../types';
import { DeezerSearchOptions } from '@app/state/deezer/types';
import { SpotifySearchOptions } from '@app/state/spotify/types';
import { executeDeezerSearchSaga } from './execute-deezer-search';
import { executeSpotifySearchSaga } from './execute-spotify-search';

export function* executeSearchRequest(
  searchSource:SearchSource, 
  searchOptions: SearchOptions, 
  pageIndex: number, 
  pageSize: number
) {
  if (searchSource === 'deezer') {
    yield call(executeDeezerSearchSaga, searchOptions as DeezerSearchOptions, pageIndex, pageSize);
  } else if (searchSource === 'spotify') {
    yield call(executeSpotifySearchSaga, searchOptions as SpotifySearchOptions, pageIndex, pageSize);
  }
}