import { cancel, spawn, takeEvery, take } from '@redux-saga/core/effects';
import { Task } from '@redux-saga/types';
import { AppAction } from '../../actions';
import { SpawnDynamicSagaAction } from '../actions';
import { CANCEL_DYNAMIC_SAGA, SPAWN_DYNAMIC_SAGA } from '../consts';

export function* watchSpawningDynamicSagas(): any {
  yield takeEvery(SPAWN_DYNAMIC_SAGA, spawnDynamicSaga);
}

export function* spawnDynamicSaga({ payload: { saga } }: SpawnDynamicSagaAction): any {
  const task: Task = yield spawn(saga);

  yield take(
    (action: AppAction) => action.type === CANCEL_DYNAMIC_SAGA && action.payload.saga === saga,
  );

  yield cancel(task);
}
