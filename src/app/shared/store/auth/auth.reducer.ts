import { Action, createReducer, on } from "@ngrx/store";

import { IAuthState, initialAuthState } from "./auth.state";
import { login, loginFailure, loginSuccess } from "./auth.actions";

const _authReducer = createReducer(
  initialAuthState,
  on(login, state => ({
    ...state,
    user: null,
    error: null
  })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    error
  })),
);

export function authReducer(
  state: IAuthState = initialAuthState,
  action: Action
): IAuthState {
  return _authReducer(state, action);
}
