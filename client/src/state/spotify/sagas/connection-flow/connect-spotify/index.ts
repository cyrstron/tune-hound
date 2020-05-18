import {getContext, put, select, call, all} from 'redux-saga/effects';
import {
  connectSpotifyPending,
  spotifyMounted,
  setSpotifyAuthData,
  setSpotifyCurrentUser,
  connectSpotifyFailure,
  connectSpotifySuccess,
} from '../../../actions';
import {SPOTIFY_SERVICE_CTX_KEY} from '@app/consts';
import {SpotifyService} from '../../../services/spotify-service';
import {
  selectIsSpotifyLoggedIn,
  selectIsSpotifyTokenExpired,
  selectSpotifyAccessToken,
  selectIsSpotifyMounted,
} from '../../../selectors';
import {SpotifyAuthData, setSpotifyAuthState} from '../../../services/helpers';
import {updateSpotifyTokenSaga} from '../../update-token';
import {EventChannel} from 'redux-saga';
import {setUpSpotifyPlayer} from './set-up-player';

export function* connectSpotifySaga(): any {
  const pendingAction = connectSpotifyPending();

  yield put(pendingAction);

  const [
    spotifyService,
    isLoggedIn,
    isExpired,
  ]: [SpotifyService, boolean, boolean] = yield all([
    getContext(SPOTIFY_SERVICE_CTX_KEY),
    select(selectIsSpotifyLoggedIn),
    select(selectIsSpotifyTokenExpired),
  ]);

  try {
    if (!isLoggedIn) {
      const authData: SpotifyAuthData = yield spotifyService.api.login();

      const setAuthDataAction = setSpotifyAuthData(authData);

      setSpotifyAuthState(authData);

      yield put(setAuthDataAction);
    } else if (isExpired) {
      yield call(updateSpotifyTokenSaga);
    }

    const accessToken: string = yield select(selectSpotifyAccessToken);

    const currentUser: SpotifyApi.CurrentUsersProfileResponse = yield spotifyService.api
      .getCurrentUser(accessToken);

    const setCurrentUserAction = setSpotifyCurrentUser(currentUser);

    yield put(setCurrentUserAction);

    const isMounted: boolean = yield select(selectIsSpotifyMounted);

    if (!isMounted) {
      yield spotifyService.mount();

      const mountAction = spotifyMounted();

      yield put(mountAction);
    }

    const channels: {[key: string]: EventChannel<any>} = yield call(
      setUpSpotifyPlayer,
      spotifyService,
    );

    const successAction = connectSpotifySuccess();

    yield put(successAction);

    return channels;
  } catch (err) {
    const failureAction = connectSpotifyFailure(err);

    yield put(failureAction);

    return;
  }
}
