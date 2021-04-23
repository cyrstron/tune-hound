import { put, select, call } from 'redux-saga/effects';
import { findSourceItem } from './find-source-item';
import { fetchSourceDetails } from './fetch-source-details';
import {
  ExtendSearchResultAction,
  extendSearchResultFailure,
  extendSearchResultPending,
  extendSearchResultSuccess,
} from '../../state';
import { SearchResult, SourceItem, SourceItemShort } from '../../state/types';
import { selectSearchResultById } from '../../state/selectors';

export function* extendSearchResultSaga({
  payload: { itemId, source },
}: ExtendSearchResultAction): any {
  const searchItem: SearchResult = yield select(selectSearchResultById, itemId);

  if (!searchItem) return;

  let result: SourceItem | null | undefined = searchItem.sources[source];

  if (result === undefined && !searchItem.isCrossExtendable) return;

  const pendingAction = extendSearchResultPending(itemId, source);

  yield put(pendingAction);

  try {
    if (result === undefined) {
      result = yield call(findSourceItem, searchItem, source);
    }

    if (result) {
      result = yield call(fetchSourceDetails, result as SourceItemShort, source);
    }

    const successAction = extendSearchResultSuccess(itemId, source, result as SourceItem);

    yield put(successAction);
  } catch (err) {
    const failureAction = extendSearchResultFailure(itemId, source, err);

    yield put(failureAction);
  }
}
