import {takeEvery} from 'redux-saga/effects';
import { SET_SEARCH_PAGE_INDEX, SET_SEARCH_PAGE_SIZE } from '../../consts';
import { setSearchPageIndexSaga } from './set-search-page-index';
import { setSearchPageSizeSaga } from './set-search-page-size';

export function* watchSearchPagination() {
  yield takeEvery(SET_SEARCH_PAGE_INDEX, setSearchPageIndexSaga);
  yield takeEvery(SET_SEARCH_PAGE_SIZE, setSearchPageSizeSaga);
}