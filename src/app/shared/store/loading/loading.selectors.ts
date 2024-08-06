import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ILoadingState } from './loading.state';

const getLoadingState = createFeatureSelector<ILoadingState>('loading');

export const isLoading = createSelector(
  getLoadingState,
  (loadingState: ILoadingState) => loadingState.loading
);
