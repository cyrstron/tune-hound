import {combineReducers} from 'redux';

import {authReducer, AuthState} from './auth';
import { deezerReducer, DeezerState } from './deezer/reducer';

export interface AppState {
  auth: AuthState;
  deezer: DeezerState;
}

export const rootReducer = combineReducers<AppState>({
  auth: authReducer,
  deezer: deezerReducer,
});

export {sagaMiddleware} from './sagas';