import { spawn } from '@redux-saga/core/effects';
import { watchInjectingDynamicReducer } from './inject-dynamic-reducer';
import { watchSpawningDynamicSagas } from './inject-dynamic-saga';

export function* rootSaga(): any {
  yield spawn(watchSpawningDynamicSagas);
  yield spawn(watchInjectingDynamicReducer);
}
