import {put} from 'redux-saga/effects';
import { DeezerSearchOptions, DeezerSearchResult } from "@app/state/deezer/types";
import { getContext } from "redux-saga/effects";
import { DEEZER_SERVICE_CTX_KEY } from "@app/consts";
import { DeezerService } from "@app/state/deezer";
import { executeSearchPending, executeSearchSuccess, executeSearchFailure } from '../../actions';

export function* executeDeezerSearchSaga(options: DeezerSearchOptions) {
  const deezerService: DeezerService = yield getContext(DEEZER_SERVICE_CTX_KEY);

  const pendingAction = executeSearchPending();

  yield put(pendingAction);

  try {
    const {data, total}: DeezerSearchResult = yield deezerService.search(options);

    const successAction = executeSearchSuccess(data.map(item => ({deezer: item})), total);

    yield put(successAction);
  } catch (err) {
    const failureAction = executeSearchFailure(err);

    yield put(failureAction);
  }
};