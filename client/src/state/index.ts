import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from "redux-devtools-extension";
import axios from 'axios';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {DEEZER_SERVICE_CTX_KEY, SPOTIFY_SERVICE_CTX_KEY, AXIOS_CTX_KEY} from 'consts';

import { SpotifyService } from './spotify/services/spotify-service';
import { SpotifyWebApi } from './spotify/services/spotify-web-api';

import {authReducer, AuthState} from './auth';
import { 
  deezerReducer, 
  DeezerState,  
  DeezerService 
} from './deezer';
import { SearchState, searchReducer } from './search';
import { SpotifyState, spotifyReducer } from './spotify';
import { PlayerState, playerReducer } from './player';

import { rootSaga } from './sagas';
export interface AppState {
  auth: AuthState;
  deezer: DeezerState;
  spotify: SpotifyState;
  search: SearchState;
  player: PlayerState;
}

export const createAppStore = () => {
  const rootReducer = combineReducers<AppState>({
    auth: authReducer,
    deezer: deezerReducer,
    search: searchReducer,
    spotify: spotifyReducer,
    player: playerReducer,
  });

  const axiosInstance = axios.create();

  const spotifyWebApi = new SpotifyWebApi(axiosInstance);

  const sagaMiddleware = createSagaMiddleware({
    context: {
      [DEEZER_SERVICE_CTX_KEY]: new DeezerService(),
      [SPOTIFY_SERVICE_CTX_KEY]: new SpotifyService(spotifyWebApi),
      [AXIOS_CTX_KEY]: axiosInstance,
    }
  });

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
