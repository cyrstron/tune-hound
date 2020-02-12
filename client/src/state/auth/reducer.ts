import { AuthAction } from "./actions";

export interface AuthState {
}

const initialAuthState: AuthState = {
}

export function authReducer(
  state: AuthState = initialAuthState,
  {type, payload}: AuthAction,
) {
  switch(type) {
    default:
      return state;
  }
}