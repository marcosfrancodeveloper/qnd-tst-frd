import { Injectable } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

import { mockUser } from 'src/app/shared/mock/user.mock';
import { CommonsService } from 'src/app/shared/services/commons.service';
import { IUser } from '../models/user.model';
import { IError } from '../models/error.model';
import { NgxMaskService } from 'ngx-mask';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _commonService: CommonsService,
    private _ngxMaskService: NgxMaskService,
  ) {}

  login(
    emailOrCpf: string,
    password: string
  ): Observable<IUser | IError> {
    if (this._validate(emailOrCpf, password)) {
      return of(mockUser)
        .pipe(delay(5000));
    }

    const response: IError = {
      status: HttpStatusCode.BadRequest,
      code: 'invalid_credentials',
      message: 'Credencias inválidas.',
    };
    return throwError(() => response)
      .pipe(delay(5000));
  }

  private _validate(
    emailOrCpf: string,
    password: string
  ): boolean {
    if (this._commonService.isCpf(emailOrCpf)) {
      emailOrCpf = this._ngxMaskService.applyMask(
        emailOrCpf,
        '000.000.000-00'
      );
    }

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
      .pipe(delay(5000));
  }
}
