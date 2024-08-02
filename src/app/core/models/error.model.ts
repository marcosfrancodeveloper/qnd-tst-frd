import { HttpStatusCode } from "@angular/common/http";

export interface IError {
  status: HttpStatusCode;
  code: string;
  message: string;
}
