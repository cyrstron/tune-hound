import {getContext, put, select, call, all, fork, take, delay} from 'redux-saga/effects';
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
  selectIsSpotifyPlayerReady,
} from '../../../selectors';
import {SpotifyAuthData, setSpotifyAuthState} from '../../../services/helpers';
import {updateSpotifyTokenSaga} from '../../update-token';
import { initSpotifyPlayer } from './init-spotify-player';
import { watchPlayerState } from './watch-player-state';
import { AppAction } from '@app/state/actions';
import { SET_SPOTIFY_PLAYER_READY } from '@app/state/spotify/consts';

export function* connectSpotify(): any {
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

    yield fork(initSpotifyPlayer, spotifyService);

    yield delay(200);

    yield spotifyService.connect();

    const isReady = yield select(selectIsSpotifyPlayerReady);

    if (!isReady) {
      yield take(
        (action: AppAction) => action.type === SET_SPOTIFY_PLAYER_READY && action.payload.isReady
      );
    }
      
    yield fork(watchPlayerState);

    const successAction = connectSpotifySuccess();

    yield put(successAction);
  } catch (err) {
    const failureAction = connectSpotifyFailure(err);

    yield put(failureAction);
  }
}
