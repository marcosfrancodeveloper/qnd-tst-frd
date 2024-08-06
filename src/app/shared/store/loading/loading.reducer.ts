import { Action, createReducer, on } from "@ngrx/store";
import { ILoadingState, initialLoadingState } from "./loading.state";
import {
  startLoading,
  stopLoading,
} from "./loading.actions";

const _loadingReducer = createReducer(
  initialLoadingState,
  on(startLoading, state => ({
    ...state,
    loading: true,
  })),
  on(stopLoading, state => ({
    ...state,
    loading: false,
  })),
);

export function loadingReducer(
  state: ILoadingState = initialLoadingState,
  action: Action
): ILoadingState {
  return _loadingReducer(state, action);
}
