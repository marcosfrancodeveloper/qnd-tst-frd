import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(
    emailOrCpf: string,
    password: string
  ): Observable<any> {
    const response = {
      id: 1,
      emailOrCpf
    };

    return of(response)
      .pipe(delay(2000));
  }
}
