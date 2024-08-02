import { Action, createReducer, on } from "@ngrx/store";

import { IAuthState, initialAuthState } from "./auth.state";
import { login, loginFailure, loginSuccess } from "./auth.actions";

const _authReducer = createReducer(
  initialAuthState,
  on(login, state => ({
    ...state,
    user: null,
    error: null,
    loading: true,
    isAuthenticated: false,
  })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null,
    loading: false,
    isAuthenticated: true,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    error,
    loading: false,
    isAuthenticated: false,
  })),
);

export function authReducer(
  state: IAuthState = initialAuthState,
  action: Action
): IAuthState {
  return _authReducer(state, action);
}
