import {getContext, put, select, call} from 'redux-saga/effects';
import {deezerConfig, DEEZER_SERVICE_CTX_KEY} from 'consts';
import {
  connectDeezerPending,
  connectDeezerSuccess,
  connectDeezerFailure,
  setDeezerMounted,
  setDeezerInited,
  setDeezerCurrentUser,
} from '../../../actions';
import {DeezerService} from '../../../services';
import {setDeezerConnectedState} from '../../../services/helpers';
import {selectDeezerMounted, selectDeezerInited} from '../../../selectors';
import {DeezerUser} from '../../../types';
import {setUpDeezerPlayer} from './set-up-deezer-player';

const {initConfig} = deezerConfig;

export function* connectDeezerSaga(): any {
  const pendingAction = connectDeezerPending();

  yield put(pendingAction);

  const deezerService: DeezerService = yield getContext(DEEZER_SERVICE_CTX_KEY);

  try {
    const isMounted: boolean = yield select(selectDeezerMounted);

    if (!isMounted) {
      yield deezerService.mount();

      const mountAction = setDeezerMounted();

      yield put(mountAction);
    }

    const isInited: boolean = yield select(selectDeezerInited);

    if (!isInited) {
      yield deezerService.init({
        ...initConfig,
        player: {},
      });

      yield call(setUpDeezerPlayer, deezerService);

      const initAction = setDeezerInited();

      yield put(initAction);
    }

    const isLoggedIn: boolean = yield deezerService.isLoggedIn();

    if (!isLoggedIn) {
      yield deezerService.connect();
    }

    setDeezerConnectedState(true);

    const successAction = connectDeezerSuccess();

    yield put(successAction);

    const user: DeezerUser = yield deezerService.me();

    const currentUserAction = setDeezerCurrentUser(user);

    yield put(currentUserAction);

    return true;
  } catch (err) {
    const failureAction = connectDeezerFailure(err);

    yield put(failureAction);

    return false;
  }
}
