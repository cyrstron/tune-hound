import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';
import {
  combineReducers,
  createStore,
  applyMiddleware,
  Store,
  CombinedState,
  Reducer,
} from 'redux';
import {
  DEEZER_SERVICE_CTX_KEY,
  SPOTIFY_SERVICE_CTX_KEY,
  AXIOS_CTX_KEY,
  AUDIO_SERVICE_CTX_KEY,
  INJECT_REDUCER_KEY,
} from 'consts';

import { SpotifyService } from './spotify/services/spotify-service';
import { SpotifyWebApi } from './spotify/services/spotify-web-api';

import { authReducer, AuthState } from './auth';
import { DeezerState, DeezerService } from './deezer';
import { SearchState, searchReducer } from './search';
import { SpotifyState } from './spotify';
import { PlayerState, playerReducer } from './player';

import { rootSaga } from './sagas';
import { AudioService } from './audio-player/services/audio-service';
import { audioReducer, AudioState } from './audio-player';
import { AppAction } from './actions';

export interface AppState {
  auth: AuthState;
  deezer?: DeezerState;
  spotify?: SpotifyState;
  search: SearchState;
  player: PlayerState;
  audio: AudioState;
}

const staticReducers = {
  auth: authReducer,
  audio: audioReducer,
  search: searchReducer,
  player: playerReducer,
};

const asyncReducers: {
  [key: string]: (state: AppState, action: AppAction) => AppState;
} = {};

function createReducer() {
  return combineReducers<AppState>({
    ...staticReducers,
    ...asyncReducers,
  });
}

export const createAppStore = (): Store<CombinedState<AppState>, AppAction> => {
  const rootReducer = combineReducers<AppState>({
    auth: authReducer,
    audio: audioReducer,
    search: searchReducer,
    player: playerReducer,
  });

  const axiosInstance = axios.create();

  const spotifyWebApi = new SpotifyWebApi(axiosInstance);

  const sagaMiddleware = createSagaMiddleware({
    context: {
      [DEEZER_SERVICE_CTX_KEY]: new DeezerService(),
      [SPOTIFY_SERVICE_CTX_KEY]: new SpotifyService(spotifyWebApi),
      [AXIOS_CTX_KEY]: axiosInstance,
      [AUDIO_SERVICE_CTX_KEY]: new AudioService(),
      [INJECT_REDUCER_KEY]: injectReducer,
    },
  });

  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

  sagaMiddleware.run(rootSaga);

  function injectReducer(key: string, reducer: Reducer) {
    asyncReducers[key] = reducer;

    const newReducer = createReducer();
    store.replaceReducer(newReducer);
  }

  return store;
};
