import { call, put } from 'redux-saga/effects';
import { DeezerSearchOptions } from '@app/state/deezer/types';
import { SpotifySearchOptions } from '@app/state/spotify/types';
import { executeDeezerSearchSaga } from './execute-deezer-search';
import { executeSpotifySearchSaga } from './execute-spotify-search';
import { updatePageParamsSaga } from '../update-page-params';
import { SearchOptions, SearchResult } from '../../state/types';
import {
  executeSearchFailure,
  executeSearchPending,
  executeSearchSuccess,
  resetSearchResults,
} from '../../state';
import { MediaSource } from '@app/types/media';

export function* executeSearchRequest(
  searchSource: MediaSource,
  searchOptions: SearchOptions,
  pageIndex: number,
  pageSize: number,
  withReset = false,
): any {
  const pendingAction = executeSearchPending();

  yield put(pendingAction);

  try {
    let response: {
      total: number;
      results: SearchResult[];
    } = { total: 0, results: [] };

    if (searchSource === MediaSource.DEEZER) {
      response = yield call(
        executeDeezerSearchSaga,
        searchOptions as DeezerSearchOptions,
        pageIndex,
        pageSize,
      );
    } else if (searchSource === MediaSource.SPOTIFY) {
      response = yield call(
        executeSpotifySearchSaga,
        searchOptions as SpotifySearchOptions,
        pageIndex,
        pageSize,
      );
    }

    if (withReset) {
      yield put(resetSearchResults());
    }

    yield call(updatePageParamsSaga, pageIndex, pageSize);

    const { results, total } = response;

    const { keys, map } = results.reduce(
      (results, item) => {
        results.keys.push(item.id);
        results.map[item.id] = item;

        return results;
      },
      { keys: [], map: {} } as { keys: string[]; map: Record<string, SearchResult> },
    );

    const successAction = executeSearchSuccess(keys, map, total, pageIndex * pageSize);

    yield put(successAction);
  } catch (err) {
    const failureAction = executeSearchFailure(err);

    yield put(failureAction);
  }
}
