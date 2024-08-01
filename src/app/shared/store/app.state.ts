import { ActionReducerMap } from "@ngrx/store";

import { IAuthState } from "./auth/auth.state";
import { authReducer } from "./auth/auth.reducer";
import { AuthEffects } from "./auth/auth.effects";

export interface IAppState {
  auth: IAuthState;
}

export const appReducer: ActionReducerMap<IAppState> = {
  auth: authReducer
};

export const appEffects = [
  AuthEffects,
];
