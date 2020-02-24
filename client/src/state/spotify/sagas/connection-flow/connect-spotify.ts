import { getContext, put, select, call, take, all, fork } from "redux-saga/effects";
import { eventChannel, EventChannel, END } from 'redux-saga';

import { 
  connectSpotifyPending, 
  spotifyMounted, 
  setSpotifyAuthData, 
  setSpotifyCurrentUser, 
  connectSpotifyFailure,
  connectSpotifySuccess,
  setSpotifyPlayerReady,
  setSpotifyPlayerState,
  setSpotifyPlayerInited,
} from "../../actions";
import { SPOTIFY_SERVICE_CTX_KEY } from "@app/consts";
import { SpotifyService } from "../../services/spotify-service";
import { 
  selectIsSpotifyLoggedIn, 
  selectIsSpotifyTokenExpired, 
  selectSpotifyAccessToken, 
  selectIsSpotifyMounted,
  selectIsSpotifyPlayerInited
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

    const isMounted: boolean = yield select(selectIsSpotifyMounted);

    if (!isMounted) {
      yield spotifyService.mount();  
  
      const mountAction = spotifyMounted();
  
      yield put(mountAction);
    }
    
    const isInited: boolean = yield select(selectIsSpotifyPlayerInited);

    if (!isInited) {
      yield fork(initSpotifyPlayer, spotifyService);

      const initedAction = setSpotifyPlayerInited(true);
  
      yield put(initedAction);
    }

    yield all([    
      yield fork(listenPlayerErrors, spotifyService),
      yield fork(listenPlayerReady, spotifyService),
      yield fork(listenPlayerStateChange, spotifyService),
    ]);

    yield spotifyService.connect();

    const playerState = yield spotifyService.getState();

    const stateAction = setSpotifyPlayerState(playerState);

    yield put(stateAction);

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
    const getToken: END | ((token?: string) => void) = yield take(channel);
    
    const [isLoggedIn, isExpired] = yield all([
      select(selectIsSpotifyLoggedIn),
      select(selectIsSpotifyTokenExpired),
    ]);

    if (typeof getToken === 'object') {
      return;
    }

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

function* listenPlayerErrors(spotifyService: SpotifyService) {
  const {player} = spotifyService;

  if (!player) return;

  const channel = eventChannel<Spotify.Error>(emitter => {
    player.addListener('initialization_error', emitter);
    player.addListener('authentication_error', emitter);
    player.addListener('account_error', emitter);
    player.addListener('playback_error', emitter);
      
    return () => {
      player.removeListener('initialization_error', emitter);
      player.removeListener('authentication_error', emitter);
      player.removeListener('account_error', emitter);
      player.removeListener('playback_error', emitter);
    };
  });

  while (true) {
    const error: Spotify.Error | END = yield take(channel);

    if (
      typeof error === 'object' && 
      'type' in error && 
      error.type === END.type
    ) {
      return;
    }

    console.log(error);
  }
}

function* listenPlayerReady(spotifyService: SpotifyService) {
  const {player} = spotifyService;

  if (!player) return;

  const channel = eventChannel<{
    instance: Spotify.WebPlaybackInstance;
    isReady: boolean;
  }>(emitter => {
    const onReady = (instance: Spotify.WebPlaybackInstance) => {
      emitter({
        instance,
        isReady: true,
      });
    };
    const onNotReady = (instance: Spotify.WebPlaybackInstance) => {
      emitter({
        instance,
        isReady: false,
      });
    };

    player.addListener('ready', onReady);
    player.addListener('not_ready', onNotReady);
      
    return () => {
      player.removeListener('ready', onReady);
      player.removeListener('not_ready', onNotReady);
    };
  });

  while (true) {
    const readyEvent: {
      instance: Spotify.WebPlaybackInstance;
      isReady: boolean;
    } | END = yield take(channel);

    if (
      typeof readyEvent === 'object' && 
      'type' in readyEvent
    ) {
      return;
    }

    const {instance, isReady} = readyEvent;

    const readyAction = setSpotifyPlayerReady(instance, isReady);
    
    yield put(readyAction);
  }
}

function* listenPlayerStateChange(spotifyService: SpotifyService) {
  const {player} = spotifyService;

  if (!player) return;

  const channel = eventChannel<Spotify.PlaybackState | null>(emitter => {
    player.addListener('player_state_changed', emitter);
      
    return () => {
      player.removeListener('player_state_changed', emitter);
    };
  });

  while (true) {
    const state: Spotify.PlaybackState | null | END = yield take(channel);
    
    if (
      state &&
      typeof state === 'object' && 
      'type' in state
    ) {
      return;
    }

    const stateAction = setSpotifyPlayerState(state);

    yield put(stateAction);
  }
}