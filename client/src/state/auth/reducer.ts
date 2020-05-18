import {AuthAction} from './actions';

export interface AuthState {
  isLoggedIn?: boolean;
}

const initialAuthState: AuthState = {
};

export function authReducer(
  state: AuthState = initialAuthState,
  {type}: AuthAction,
): AuthState {
  switch (type) {
  default:
    return state;
  }
}
