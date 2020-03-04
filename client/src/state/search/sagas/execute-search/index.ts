import {call, takeEvery} from 'redux-saga/effects';
import { EXECUTE_SEARCH } from "../../consts";
import { ExecuteSearchAction } from '../../actions';
import { executeDeezerSearchSaga } from './execute-deezer-search';
import { executeSpotifySearchSaga } from './execute-spotify-search';
import { DeezerSearchOptions } from '@app/state/deezer/types';
import { SpotifySearchOptions } from '@app/state/spotify/types';

export function* watchSearch() {
  yield takeEvery(EXECUTE_SEARCH, executeSearchSaga);
}

export function* executeSearchSaga({
  payload: {source, options},
}: ExecuteSearchAction) {
  if (source === 'deezer') {
    yield call(executeDeezerSearchSaga, options as DeezerSearchOptions);
  } else if (source === 'spotify') {
    yield call(executeSpotifySearchSaga, options as SpotifySearchOptions);
  }
}