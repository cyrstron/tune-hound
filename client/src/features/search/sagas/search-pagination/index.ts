import { takeEvery } from 'redux-saga/effects';
import { EXECUTE_SEARCH_BY_PAGE_INDEX, EXECUTE_SEARCH_BY_PAGE_SIZE } from '../../state/consts';
import { setSearchPageIndexSaga } from './set-search-page-index';
import { setSearchPageSizeSaga } from './set-search-page-size';

export function* watchSearchPagination(): any {
  yield takeEvery(EXECUTE_SEARCH_BY_PAGE_INDEX, setSearchPageIndexSaga);
  yield takeEvery(EXECUTE_SEARCH_BY_PAGE_SIZE, setSearchPageSizeSaga);
}
