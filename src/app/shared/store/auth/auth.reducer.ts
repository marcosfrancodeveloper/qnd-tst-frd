import { Action, createReducer, on } from "@ngrx/store";

import { IAuthState, initialAuthState } from "./auth.state";
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  resetState
} from "./auth.actions";

const _authReducer = createReducer(
  initialAuthState,
  on(login, state => ({
    ...state,
    user: null,
    error: null,
    isAuthenticated: false,
  })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null,
    isAuthenticated: true,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    error,
    isAuthenticated: false,
  })),
  on(resetState, state => ({
    ...state,
    user: null,
    error: null,
    isAuthenticated: false,
  })),
  on(logout, state => ({
    ...state,
    user: null,
    error: null,
    isAuthenticated: false,
  })),
);

export function authReducer(
  state: IAuthState = initialAuthState,
  action: Action
): IAuthState {
  return _authReducer(state, action);
}
