import { takeEvery, take } from '@redux-saga/core/effects';
import { AppAction } from '../../actions';
import { AddDynamicReducerAction } from '../actions';
import { ADD_DYNAMIC_REDUCER, REMOVE_DYNAMIC_REDUCER } from '../consts';

export function* watchAddingDynamicReducer(): any {
  yield takeEvery(ADD_DYNAMIC_REDUCER, addDynamicReducer);
}

export function* addDynamicReducer({ payload: { path, reducer } }: AddDynamicReducerAction): any {
  yield take((action: AppAction): boolean => {
    if (action.type !== REMOVE_DYNAMIC_REDUCER) return false;
    const { path: cancelPath } = action.payload;

    return (
      (Array.isArray(cancelPath) ? cancelPath.join('/') : cancelPath) ===
      (Array.isArray(path) ? path.join('/') : path)
    );
  });
}
