import { spawn } from '@redux-saga/core/effects';
import { watchAddingDynamicReducer } from './add-dynamic-reducer';
import { watchSpawningDynamicSagas } from './spawn-dynamic-saga';

export function* rootSaga(): any {
  yield spawn(watchSpawningDynamicSagas);
  yield spawn(watchAddingDynamicReducer);
}
