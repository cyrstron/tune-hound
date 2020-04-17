import {put, select, call} from 'redux-saga/effects';
import { 
  ExtendSearchResultAction, 
  extendSearchResultPending, 
  extendSearchResultFailure, 
  extendSearchResultSuccess
} from "../../actions";
import { SearchItem, SearchResult, SearchResultType } from '../../types';
import { selectSearchResultById } from '../../selectors';
import { findSourceItem } from './find-source-item';
import { fetchSourceDetails } from './fetch-source-details';

const crossSourceItems: SearchResultType[] = [
  'track',
  'album',
  'artist',
];

export function* extendSearchResult({
  payload: {itemId, source}
}: ExtendSearchResultAction) {
  const pendingAction = extendSearchResultPending(itemId, source);

  const searchItem: SearchResult = yield select(selectSearchResultById, itemId);

  if (!searchItem) return;

  let result: SearchItem | null | undefined = searchItem.sources[source];

  if (result === undefined && !crossSourceItems.includes(searchItem.type)) return;

  yield put(pendingAction);

  try {
    if (result === undefined) {
      result = yield call(findSourceItem, searchItem, source);
    }

    if (result) {
      result = yield call(fetchSourceDetails, result, source);
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