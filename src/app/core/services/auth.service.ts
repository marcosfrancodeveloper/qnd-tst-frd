import { Injectable } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { NgxMaskService } from 'ngx-mask';

import { mockUser } from 'src/app/shared/mock/user.mock';
import { CommonService } from 'src/app/shared/services/common.service';
import { IUser } from '../models/user.model';
import { IError } from '../models/error.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _defaultDelay = 3000;

  constructor(
    private _commonService: CommonService,
    private _ngxMaskService: NgxMaskService,
  ) {}

  login(
    emailOrCpf: string,
    password: string
  ): Observable<IUser | IError> {
    if (this._validate(emailOrCpf, password)) {
      return of(mockUser)
        .pipe(delay(this._defaultDelay));
    }

    const response: IError = {
      status: HttpStatusCode.BadRequest,
      code: 'invalid_credentials',
      message: 'Credencias inválidas.',
    };
    return throwError(() => response)
      .pipe(delay(this._defaultDelay));
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
      .pipe(delay(this._defaultDelay));
  }
}
