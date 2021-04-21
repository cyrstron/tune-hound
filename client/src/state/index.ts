import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';
import { createStore, applyMiddleware, Store, CombinedState } from 'redux';
import {
  DEEZER_SERVICE_CTX_KEY,
  SPOTIFY_SERVICE_CTX_KEY,
  AXIOS_CTX_KEY,
  AUDIO_SERVICE_CTX_KEY,
  REDUCERS_MANAGER_KEY,
} from 'consts';

import { SpotifyService } from './spotify/services/spotify-service';
import { SpotifyWebApi } from './spotify/services/spotify-web-api';

import { authReducer, AuthState } from './auth';
import { DeezerState, DeezerService } from './deezer';
import { SearchState, searchReducer } from '../features/search/search';
import { SpotifyState } from './spotify';
import { PlayerState, playerReducer } from './player';

import { appSaga } from './sagas';
import { AudioService } from './audio-player/services/audio-service';
import { audioReducer, AudioState } from './audio-player';
import { AppAction } from './actions';
import { Selector } from 'reselect';
import { combineStoredReducers, ReducersStore } from './utils';
import { ReducersManager } from './reducers-manager';

export interface AppState {
  auth: AuthState;
  deezer?: DeezerState;
  spotify?: SpotifyState;
  search: SearchState;
  player: PlayerState;
  audio: AudioState;
}

export type AppSelector<Result> = Selector<AppState, Result>;

const staticReducers: ReducersStore<AppState> = {
  auth: authReducer,
  audio: audioReducer,
  search: searchReducer,
  player: playerReducer,
};

export const createAppStore = (): Store<CombinedState<AppState>, AppAction> => {
  const rootReducer = combineStoredReducers<AppState>(staticReducers);

  const axiosInstance = axios.create();

  const spotifyWebApi = new SpotifyWebApi(axiosInstance);
  const reducersManager = new ReducersManager(staticReducers);

  const sagaMiddleware = createSagaMiddleware({
    context: {
      [DEEZER_SERVICE_CTX_KEY]: new DeezerService(),
      [SPOTIFY_SERVICE_CTX_KEY]: new SpotifyService(spotifyWebApi),
      [AXIOS_CTX_KEY]: axiosInstance,
      [AUDIO_SERVICE_CTX_KEY]: new AudioService(),
      [REDUCERS_MANAGER_KEY]: reducersManager,
    },
  });

  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

  reducersManager.store = store;

  sagaMiddleware.run(appSaga);

  return store;
};
