import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from 'src/app/core/modules/angular-material.module';
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
    AngularMaterialModule,
    SharedModule,
  ]
})
export class LoginModule { }
