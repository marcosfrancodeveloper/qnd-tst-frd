import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { IAppState } from '../../store/app.state';
import { isLoading } from '../../store/loading/loading.selectors';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  readonly isLoading$: Observable<boolean> = this._store.select(isLoading);

  constructor(
    private _store: Store<IAppState>
  ) {}
}
