import {call, takeEvery, all, select} from 'redux-saga/effects';
import { EXECUTE_SEARCH } from "../../consts";
import { ExecuteSearchAction } from '../../actions';
import { executeDeezerSearchSaga } from './execute-deezer-search';
import { executeSpotifySearchSaga } from './execute-spotify-search';
import { DeezerSearchOptions } from '@app/state/deezer/types';
import { SpotifySearchOptions } from '@app/state/spotify/types';
import { selectPageIndex, selectPageSize } from '../../selectors';

export function* watchSearch() {
  yield takeEvery(EXECUTE_SEARCH, executeSearchSaga);
}

export function* executeSearchSaga({
  payload: {source, options},
}: ExecuteSearchAction) {
  const [pageIndex, pageSize]: [number, number] = yield all([
    select(selectPageIndex),
    select(selectPageSize),
  ]);

  if (source === 'deezer') {
    yield call(executeDeezerSearchSaga, options as DeezerSearchOptions, pageIndex, pageSize);
  } else if (source === 'spotify') {
    yield call(executeSpotifySearchSaga, options as SpotifySearchOptions, pageIndex, pageSize);
  }
}
