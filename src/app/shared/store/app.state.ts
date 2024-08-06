import { ActionReducerMap } from "@ngrx/store";

import { IAuthState } from "./auth/auth.state";
import { authReducer } from "./auth/auth.reducer";
import { AuthEffects } from "./auth/auth.effects";

import { ILoadingState } from "./loading/loading.state";
import { loadingReducer } from "./loading/loading.reducer";

export interface IAppState {
  auth: IAuthState;
  loading: ILoadingState;
}

export const appReducer: ActionReducerMap<IAppState> = {
  auth: authReducer,
  loading: loadingReducer,
};

export const appEffects = [
  AuthEffects,
];
