import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { SharedModule } from 'src/app/shared/shared.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginFormComponent } from './form/form.component';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskDirective
  ],
  providers: [
    provideNgxMask(),
  ]
})
export class LoginModule { }
