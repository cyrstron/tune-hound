import { AppAction } from '../actions';

export interface AuthState {
  isLoggedIn?: boolean;
}

const initialAuthState: AuthState = {};

export function authReducer(state: AuthState = initialAuthState, { type }: AppAction): AuthState {
  switch (type) {
    default:
      return state;
  }
}
