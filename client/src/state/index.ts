import {combineReducers} from 'redux';

import {authReducer, AuthState} from './auth';
import {SourcesState} from './sources/reducer';

export interface AppState {
  auth: AuthState;
  sources: SourcesState;
}

export const rootReducer = combineReducers({
  auth: authReducer
});