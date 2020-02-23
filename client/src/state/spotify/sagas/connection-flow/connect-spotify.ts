import { getContext, put, select, call, take, all, fork } from "redux-saga/effects";
import { eventChannel, EventChannel } from 'redux-saga';

import { 
  connectSpotifyPending, 
  spotifyMounted, 
  setSpotifyAuthData, 
  setSpotifyCurrentUser, 
  connectSpotifyFailure,
  connectSpotifySuccess,
} from "../../actions";
import { SPOTIFY_SERVICE_CTX_KEY } from "@app/consts";
import { SpotifyService } from "../../services/spotify-service";
import { 
  selectIsSpotifyLoggedIn, 
  selectIsSpotifyTokenExpired, 
  selectSpotifyAccessToken 
} from "../../selectors";
import { SpotifyAuthData, setSpotifyAuthState } from "../../services/helpers";
import {updateSpotifyTokenSaga} from '../update-token';

export function* connectSpotifySaga() {
  const pendingAction = connectSpotifyPending();

  yield put(pendingAction);

  const spotifyService: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);

  try {
    const [isLoggedIn, isExpired]: [boolean, boolean] = yield all([
      select(selectIsSpotifyLoggedIn),
      select(selectIsSpotifyTokenExpired)
    ]);

    if (!isLoggedIn) {
      const authData: SpotifyAuthData = yield spotifyService.api.login();

      const setAuthDataAction = setSpotifyAuthData(authData);

      setSpotifyAuthState(authData);

      yield put(setAuthDataAction);
    } else if (isExpired) {
      yield call(updateSpotifyTokenSaga);
    }

    const accessToken: string = yield select(selectSpotifyAccessToken);

    const currentUser: SpotifyApi.CurrentUsersProfileResponse = yield spotifyService.api.getCurrentUser(accessToken);

    const setCurrentUserAction = setSpotifyCurrentUser(currentUser);

    yield put(setCurrentUserAction);

    yield spotifyService.mount();

    const mountAction = spotifyMounted();

    yield put(mountAction);

    yield fork(initSpotifyPlayer, spotifyService);

    const successAction = connectSpotifySuccess();

    yield put(successAction);
  } catch (err) {
    const failureAction = connectSpotifyFailure(err);

    yield put(failureAction);
  }
}

function* initSpotifyPlayer(spotifyService: SpotifyService) {
  const channel: EventChannel<(token: string) => void> = eventChannel(emitter => {
    spotifyService.initPlayer((getToken) => {
      emitter(getToken);
    });
      
    return () => {};
  });

  while (true) {
    const getToken = yield take(channel);
    
    const [isLoggedIn, isExpired] = yield all([
      select(selectIsSpotifyLoggedIn),
      select(selectIsSpotifyTokenExpired),
    ]);

    if (!isLoggedIn) {
      getToken();
      return;
    }

    if (isExpired) {
      yield call(updateSpotifyTokenSaga);
    }

    const accessToken: string = yield select(selectSpotifyAccessToken);

    getToken(accessToken);
  }
}

function* initPlayerErrorListeners(spotifyService: SpotifyService) {
  const channel: EventChannel<(token: string) => void> = eventChannel(emitter => {
    spotifyService.initPlayer((getToken) => {
      emitter(getToken);
    });
      
    return () => {};
  });

  while (true) {
    const getToken = yield take(channel);
    
    const [isLoggedIn, isExpired] = yield all([
      select(selectIsSpotifyLoggedIn),
      select(selectIsSpotifyTokenExpired),
    ]);

    if (!isLoggedIn) {
      getToken();
      return;
    }

    if (isExpired) {
      yield call(updateSpotifyTokenSaga);
    }

    const accessToken: string = yield select(selectSpotifyAccessToken);

    getToken(accessToken);
  }

}