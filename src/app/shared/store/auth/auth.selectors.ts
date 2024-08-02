import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAuthState } from './auth.state';

const getAuthState = createFeatureSelector<IAuthState>('auth');

export const getUser = createSelector(
  getAuthState,
  (authState: IAuthState) => authState.user
);

export const isAuthenticated = createSelector(
  getAuthState,
  (authState: IAuthState) => authState.isAuthenticated
);
