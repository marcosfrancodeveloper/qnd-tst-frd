import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from './modules/angular-material.module';

import { BannerComponent } from './components/banner/banner.component';
import { FormFieldErrorDirective } from './directives/form-field-error.directive';
import { LoadingComponent } from './components/loading/loading.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';

@NgModule({
  declarations: [
    BannerComponent,
    FormFieldErrorDirective,
    LoadingComponent,
    AlertDialogComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
  ],
  exports: [
    AngularMaterialModule,
    BannerComponent,
    FormFieldErrorDirective,
    LoadingComponent,
  ]
})
export class SharedModule { }
