export interface ILoadingState {
  loading: boolean;
}

export const initialLoadingState: ILoadingState = {
  loading: false,
};

export function getinitialLoadingState(): ILoadingState {
  return initialLoadingState;
}
