import {put} from 'redux-saga/effects';
import { 
  ExtendSearchResultAction, 
  extendSearchResultPending, 
  extendSearchResultFailure 
} from "../../actions";

export function* extendSearchResult({
  payload: {itemId, source}
}: ExtendSearchResultAction) {
  const pendingAction = extendSearchResultPending(itemId, source);

  yield put(pendingAction);

  try {

  } catch (err) {
    const failureAction = extendSearchResultFailure(itemId, source, err);

    yield put(failureAction);
  }
}