import {put, select, call} from 'redux-saga/effects';
import { 
  ExtendSearchResultAction, 
  extendSearchResultPending, 
  extendSearchResultFailure, 
  extendSearchResultSuccess
} from "../../actions";
import { SearchItem, SearchResult } from '../../types';
import { selectSearchResultById } from '../../selectors';
import { extendResultWithSpotify } from './extend-result-with-spotify';
import { extendResultWithDeezer } from './extend-result-with-deezer';

export function* extendSearchResult({
  payload: {itemId, source}
}: ExtendSearchResultAction) {
  const pendingAction = extendSearchResultPending(itemId, source);

  const searchItem: SearchResult = yield select(selectSearchResultById, itemId);

  if (!searchItem) return;

  yield put(pendingAction);

  try {
    let result: SearchItem | null | undefined;
    
    if (source === 'spotify') {
      result = yield call(extendResultWithSpotify, searchItem);
    } else if (source === 'deezer') {
      result = yield call(extendResultWithDeezer, searchItem);
    }

    const successAction = extendSearchResultSuccess(
      itemId, 
      source,
      {[source]: result}
    );

    yield put(successAction);
  } catch (err) {
    const failureAction = extendSearchResultFailure(itemId, source, err);

    yield put(failureAction);
  }
}