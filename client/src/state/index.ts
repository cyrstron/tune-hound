import createSagaMiddleware from 'redux-saga';
import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import {DEEZER_SERVICE_CTX_KEY} from 'consts';

import {authReducer, AuthState} from './auth';
import { 
  deezerReducer, 
  DeezerState,  
  DeezerService 
} from './deezer';
import { rootSaga } from './sagas';
import { composeWithDevTools } from "redux-devtools-extension";

export interface AppState {
  auth: AuthState;
  deezer: DeezerState;
}

export const createAppStore = () => {
  const rootReducer = combineReducers<AppState>({
    auth: authReducer,
    deezer: deezerReducer,
  });
  
  const sagaMiddleware = createSagaMiddleware({
    context: {
      [DEEZER_SERVICE_CTX_KEY]: new DeezerService(),
      spotifyService: undefined,
    }
  });
  
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
