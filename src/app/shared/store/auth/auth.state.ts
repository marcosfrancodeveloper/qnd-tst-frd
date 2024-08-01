export interface IAuthState {
  user: any;
  error: any;
}

export const initialAuthState: IAuthState = {
  user: null,
  error: null
};

export function getinitialAuthState(): IAuthState {
  return initialAuthState;
}
