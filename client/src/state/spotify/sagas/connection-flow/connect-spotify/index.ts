import { getContext, put, select, call, all, spawn } from "redux-saga/effects";

import { 
  connectSpotifyPending, 
  spotifyMounted, 
  setSpotifyAuthData, 
  setSpotifyCurrentUser, 
  connectSpotifyFailure,
  connectSpotifySuccess,
  setSpotifyPlayerState,
  setSpotifyPlayerInited,
} from "../../../actions";
import { SPOTIFY_SERVICE_CTX_KEY } from "@app/consts";
import { SpotifyService } from "../../../services/spotify-service";
import { 
  selectIsSpotifyLoggedIn, 
  selectIsSpotifyTokenExpired, 
  selectSpotifyAccessToken, 
  selectIsSpotifyMounted,
  selectIsSpotifyPlayerInited
} from "../../../selectors";
import { SpotifyAuthData, setSpotifyAuthState } from "../../../services/helpers";
import {updateSpotifyTokenSaga} from '../../update-token';
import { createPlayerErrorsChannel, watchPlayerErrors } from "./sagas/player-errors";
import { createPlayerReadyChannel, watchPlayerReady } from "./sagas/player-ready";
import { createPlayerStateChannel, watchPlayerStateChange } from "./sagas/player-state";
import { initSpotifyPlayer } from "./sagas/player-init";

export function* connectSpotifySaga() {
  const pendingAction = connectSpotifyPending();

  yield put(pendingAction);

  const [
    spotifyService, 
    isLoggedIn, 
    isExpired
  ]: [SpotifyService, boolean, boolean] = yield all([
    getContext(SPOTIFY_SERVICE_CTX_KEY),
    select(selectIsSpotifyLoggedIn),
    select(selectIsSpotifyTokenExpired)
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

    const currentUser: SpotifyApi.CurrentUsersProfileResponse = yield spotifyService.api.getCurrentUser(accessToken);

    const setCurrentUserAction = setSpotifyCurrentUser(currentUser);

    yield put(setCurrentUserAction);

    const isMounted: boolean = yield select(selectIsSpotifyMounted);

    if (!isMounted) {
      yield spotifyService.mount();  
  
      const mountAction = spotifyMounted();
  
      yield put(mountAction);
    }
    
    const isInited: boolean = yield select(selectIsSpotifyPlayerInited);

    if (!isInited) {
      yield spawn(initSpotifyPlayer, spotifyService);

      const initedAction = setSpotifyPlayerInited(true);
  
      yield put(initedAction);
    }

    const errorsChannel = createPlayerErrorsChannel(spotifyService);
    const readyChannel = createPlayerReadyChannel(spotifyService);
    const stateChannel = createPlayerStateChannel(spotifyService);

    yield all([
      spawn(watchPlayerErrors, errorsChannel),
      spawn(watchPlayerReady, readyChannel),
      spawn(watchPlayerStateChange, stateChannel),
    ]);

    yield spotifyService.connect();

    const playerState = yield spotifyService.getState();

    const stateAction = setSpotifyPlayerState(playerState);

    yield put(stateAction);

    const successAction = connectSpotifySuccess();

    yield put(successAction);

    return {
      errorsChannel,
      readyChannel,
      stateChannel,
    };
  } catch (err) {
    const failureAction = connectSpotifyFailure(err);

    yield put(failureAction);

    return;
  }
}
