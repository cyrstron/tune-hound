import { cancel, spawn, takeEvery, take, call } from '@redux-saga/core/effects';
import { Task } from '@redux-saga/types';
import { AppAction } from '../../actions';
import { InjectDynamicSagaAction } from '../actions';
import { INJECT_DYNAMIC_SAGA, EJECT_DYNAMIC_SAGA } from '../consts';

export function* watchSpawningDynamicSagas(): any {
  yield takeEvery(INJECT_DYNAMIC_SAGA, injectDynamicSagaSaga);
}

export function* injectDynamicSagaSaga({ payload: { saga } }: InjectDynamicSagaAction): any {
  const task: Task = yield spawn(saga);

  yield call(waitForSagaEject, saga);

  yield cancel(task);
}

export function* waitForSagaEject(saga: () => any): any {
  yield take(
    (action: AppAction) => action.type === EJECT_DYNAMIC_SAGA && action.payload.saga === saga,
  );
}
