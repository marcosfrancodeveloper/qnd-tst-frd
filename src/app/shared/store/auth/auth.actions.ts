import { createAction, props } from "@ngrx/store";

export const login = createAction(
  '[Auth] Login',
  props<{ emailOrCpf: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login success',
  props<{ user: any }>()
);

export const loginFailure = createAction(
  '[Auth] Login failure',
  props<{ error: any }>()
);

export const resetState = createAction(
  '[Auth] Reset state'
);
