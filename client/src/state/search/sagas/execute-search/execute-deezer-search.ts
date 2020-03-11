import {put, all, select} from 'redux-saga/effects';
import { DeezerSearchOptions, DeezerSearchResult } from "@app/state/deezer/types";
import { getContext } from "redux-saga/effects";
import { DEEZER_SERVICE_CTX_KEY } from "@app/consts";
import { DeezerService } from "@app/state/deezer";
import { executeSearchPending, executeSearchSuccess, executeSearchFailure } from '../../actions';
import { SearchResult } from '../../types';
import { selectPageIndex, selectPageSize } from '../../selectors';

export function* executeDeezerSearchSaga(options: DeezerSearchOptions, pageIndex: number, pageSize: number) {
  const deezerService: DeezerService = yield getContext(DEEZER_SERVICE_CTX_KEY);

  const pendingAction = executeSearchPending();

  yield put(pendingAction);

  try {
    const {data, total}: DeezerSearchResult = yield deezerService.search({
      ...options,
      limit: pageSize,
      index: pageIndex * pageSize,
    });

    let searchResults: SearchResult[] = [];

    const type = data[0]?.type;

    if (type === 'track') {
      searchResults = data.map((item) => ({
        type: 'track',
        name: item.title,
        artists: [item.artist.name],
        album: item.album.title,
        coverUrl: item.album.cover,
        duration: item.duration,
        sources: {
          deezer: item,
        }
      }));
    }

    const successAction = executeSearchSuccess(searchResults, total);

    yield put(successAction);
  } catch (err) {
    const failureAction = executeSearchFailure(err);

    yield put(failureAction);
  }
};