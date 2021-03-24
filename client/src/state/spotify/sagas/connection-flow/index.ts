import { take, call, fork, cancel, all, getContext } from 'redux-saga/effects';
import { DISCONNECT_SPOTIFY } from '../../consts';
import { disconnectSpotifySaga } from './disconnect-spotify';
import { Task } from 'redux-saga';
import { INJECT_REDUCER_KEY } from '@app/consts';

export function* spotifyConnectionFlow(): any {
  const [{ connectSpotify }, { spotifyReducer }, injectReducer] = yield all([
    import('./connect-spotify'),
    import('../../reducer'),
    getContext(INJECT_REDUCER_KEY),
  ]);

  injectReducer('spotify', spotifyReducer);

  const task: Task = yield fork(connectSpotify);

  yield take(DISCONNECT_SPOTIFY);

  yield cancel(task);

  yield call(disconnectSpotifySaga);
}
