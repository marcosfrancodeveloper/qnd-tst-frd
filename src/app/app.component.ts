import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-loading></app-loading>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
