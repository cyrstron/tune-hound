import { take, call, fork, cancel, all, getContext } from 'redux-saga/effects';
import { DISCONNECT_SPOTIFY } from '../../consts';
import { disconnectSpotifySaga } from './disconnect-spotify';
import { Task } from 'redux-saga';
import { REDUCERS_MANAGER_KEY } from '@app/consts';
import { ReducersManager } from '@app/state/reducers-manager';

export function* spotifyConnectionFlow(): any {
  const [{ connectSpotify }, { spotifyReducer }] = yield all([
    import('./connect-spotify'),
    import('../../reducer'),
  ]);

  const reducersManager: ReducersManager = yield getContext(REDUCERS_MANAGER_KEY);

  reducersManager.injectReducer('spotify', spotifyReducer);

  const task: Task = yield fork(connectSpotify);

  yield take(DISCONNECT_SPOTIFY);

  yield cancel(task);

  yield call(disconnectSpotifySaga);
}
