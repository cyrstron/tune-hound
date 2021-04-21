import { all, select, put } from 'redux-saga/effects';
import { setSearchPageIndex, setSearchPageSize } from '../state';
import { selectPageIndex } from '../state/selectors';

export function* updatePageParamsSaga(pageIndex: number, pageSize: number): any {
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
