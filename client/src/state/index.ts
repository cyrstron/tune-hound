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
import { SpotifyState } from './spotify';
import { PlayerState, playerReducer } from './player';

import { appSaga } from './sagas';
import { AudioService } from './audio-player/services/audio-service';
import { audioReducer, AudioState } from './audio-player';
import { AppAction } from './actions';
import { Selector } from 'reselect';
import { ReducersManager } from '../utils/redux/reducers-manager';
import { searchReducer, SearchState } from '@app/features/search/state';
import { combineNestedReducers, NestedReducersStore } from '@app/utils/redux';

export interface AppState {
  auth: AuthState;
  deezer?: DeezerState;
  spotify?: SpotifyState;
  search: SearchState;
  player: PlayerState;
  audio: AudioState;
}

export type AppSelector<Result> = Selector<AppState, Result>;

const staticReducers: NestedReducersStore<AppState, AppAction> = {
  auth: authReducer,
  audio: audioReducer,
  search: searchReducer,
  player: playerReducer,
};

export const createAppStore = (): Store<CombinedState<AppState>, AppAction> => {
  const rootReducer = combineNestedReducers<AppState, AppAction>(staticReducers);

  const axiosInstance = axios.create();

  const spotifyWebApi = new SpotifyWebApi(axiosInstance);
  const reducersManager = new ReducersManager<AppState, AppAction>(staticReducers);

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
