import { Nullable } from "src/app/shared/types/nullable.type";
import { IUser } from "src/app/core/models/user.model";
import { IError } from "src/app/core/models/error.model";

export interface IAuthState {
  user: Nullable<IUser>;
  error: Nullable<IError>;
  loading: boolean;
  isAuthenticated: boolean;
}

export const initialAuthState: IAuthState = {
  user: null,
  error: null,
  loading: false,
  isAuthenticated: false,
};

export function getinitialAuthState(): IAuthState {
  return initialAuthState;
}
