import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IUser } from 'src/app/core/models/user.model';
import { Nullable } from '../../types/nullable.type';
import { IAppState } from '../../store/app.state';
import { getUser } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  readonly user$: Observable<Nullable<IUser>> = this._store.select(getUser);

  constructor(
    private _store: Store<IAppState>,
  ) {}
}
