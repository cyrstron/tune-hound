import { takeEvery } from 'redux-saga/effects';
import { EXTEND_SEARCH_RESULT } from '../../state/consts';
import { extendSearchResultSaga } from './extend-search-result';

export function* watchExtendSearchResult(): any {
  yield takeEvery(EXTEND_SEARCH_RESULT, extendSearchResultSaga);
}
