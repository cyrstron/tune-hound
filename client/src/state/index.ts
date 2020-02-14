import createSagaMiddleware from 'redux-saga';
import {combineReducers, createStore, applyMiddleware} from 'redux';

import {authReducer, AuthState} from './auth';
import { 
  deezerReducer, 
  DeezerState, 
  DEEZER_SERVICE_CTX_KEY, 
  DeezerService 
} from './deezer';
import { rootSaga } from './sagas';

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
    applyMiddleware(sagaMiddleware),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
