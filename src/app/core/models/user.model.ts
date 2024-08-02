import { Nullable } from "../types/nullable.type";

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  cpf: string;
  avatar: Nullable<string>;
}
