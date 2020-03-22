import {all, select, put} from 'redux-saga/effects';
import { selectPageIndex } from '../selectors';
import { setSearchPageIndex, setSearchPageSize } from '../actions';

export function* updatePageParamsSaga(pageIndex: number, pageSize: number) {
    const [currentPageIndex, currentPageSize]: [number, number] = yield all([
      select(selectPageIndex),
    ]);
    
    if (currentPageIndex !== pageIndex) {
      yield put(setSearchPageIndex(pageIndex));
    }

    if (currentPageSize !== pageSize) {
      yield put(setSearchPageSize(pageSize));
    }
}