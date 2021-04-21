import { takeEvery, take, getContext, call } from '@redux-saga/core/effects';
import { REDUCERS_MANAGER_KEY, REDUCER_PATH_SEPARATOR } from '../../../consts';
import { AppAction } from '../../actions';
import { ReducersManager } from '../../reducers-manager';
import { InjectDynamicReducerAction } from '../actions';
import { INJECT_DYNAMIC_REDUCER, EJECT_DYNAMIC_REDUCER } from '../consts';

export function* watchInjectingDynamicReducer(): any {
  yield takeEvery(INJECT_DYNAMIC_REDUCER, injectDynamicReducerSaga);
}

export function* injectDynamicReducerSaga({
  payload: { path, reducer },
}: InjectDynamicReducerAction): any {
  const reducersManager: ReducersManager = yield getContext(REDUCERS_MANAGER_KEY);

  reducersManager.injectReducer(path, reducer);

  yield call(waitForReducerEject, path);

  reducersManager.ejectReducer(path);
}

export function* waitForReducerEject(path: string | string[]): any {
  yield take((action: AppAction): boolean => {
    if (action.type !== EJECT_DYNAMIC_REDUCER) return false;
    const { path: cancelPath } = action.payload;

    return (
      (Array.isArray(cancelPath) ? cancelPath.join(REDUCER_PATH_SEPARATOR) : cancelPath) ===
      (Array.isArray(path) ? path.join(REDUCER_PATH_SEPARATOR) : path)
    );
  });
}
