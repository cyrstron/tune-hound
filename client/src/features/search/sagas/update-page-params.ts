import { all, select, put } from 'redux-saga/effects';
import { selectPageIndex } from '../search/selectors';
import { setSearchPageIndex, setSearchPageSize } from '../search/actions';

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
