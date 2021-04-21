import { put, select, call } from 'redux-saga/effects';
import {
  ExtendSearchResultAction,
  extendSearchResultPending,
  extendSearchResultFailure,
  extendSearchResultSuccess,
} from '../../../../../state/search/actions';
import { SourceItem, SourceItemShort, SearchResult } from '../../../../../state/search/types';
import { createSearchResultSelector } from '../../../../../state/search/selectors';
import { findSourceItem } from './find-source-item';
import { fetchSourceDetails } from './fetch-source-details';

export function* extendSearchResult({
  payload: { itemId, source },
}: ExtendSearchResultAction): any {
  const pendingAction = extendSearchResultPending(itemId, source);

  const searchItem: SearchResult = yield select(createSearchResultSelector(itemId));

  if (!searchItem) return;

  let result: SourceItem | null | undefined = searchItem.sources[source];

  if (result === undefined && !searchItem.isCrossExtendable) return;

  yield put(pendingAction);

  try {
    if (result === undefined) {
      result = yield call(findSourceItem, searchItem, source);
    }

    if (result) {
      result = yield call(fetchSourceDetails, result as SourceItemShort, source);
    }

    const successAction = extendSearchResultSuccess(itemId, source, {
      [source]: result,
    });

    yield put(successAction);
  } catch (err) {
    const failureAction = extendSearchResultFailure(itemId, source, err);

    yield put(failureAction);
  }
}
