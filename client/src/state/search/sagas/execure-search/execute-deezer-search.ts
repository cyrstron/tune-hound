import {put} from 'redux-saga/effects';
import { DeezerSearchOptions } from "@app/state/deezer/types";
import { getContext } from "redux-saga/effects";
import { DEEZER_SERVICE_CTX_KEY } from "@app/consts";
import { DeezerService } from "@app/state/deezer";
import { executeSearchPending, executeSearchSuccess, executeSearchFailure } from '../../actions';

export function* executeDeezerSearchSaga(query: string, options: DeezerSearchOptions) {
  const deezerService: DeezerService = yield getContext(DEEZER_SERVICE_CTX_KEY);

  const pendingAction = executeSearchPending();

  yield put(pendingAction);

  try {
    const result: any[] = yield deezerService.search(options);

    const successAction = executeSearchSuccess(result.map(item => ({deezer: item})));

    yield put(successAction);
  } catch (err) {
    const failureAction = executeSearchFailure(err);

    yield put(failureAction);
  }
};