import { Injectable } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

import { mockUser } from 'src/app/shared/mock/user.mock';
import { IUser } from '../models/user.model';
import { IError } from '../models/error.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(
    emailOrCpf: string,
    password: string
  ): Observable<IUser | IError> {
    if (this._validate(emailOrCpf, password)) {
      return of(mockUser)
        .pipe(delay(2000));
    }

    const response: IError = {
      status: HttpStatusCode.BadRequest,
      code: 'invalid_credentials',
      message: 'Credencias inválidas.',
    };
    return throwError(() => response)
      .pipe(delay(2000));
  }

  private _validate(
    emailOrCpf: string,
    password: string
  ): boolean {
    if (
      emailOrCpf.match(mockUser.email) ||
      emailOrCpf.match(mockUser.cpf)
    ) {
      return password === mockUser.password;
    }
    return false;
  }

  logout(): Observable<any> {
    return of(null)
      .pipe(delay(2000));
  }
}
