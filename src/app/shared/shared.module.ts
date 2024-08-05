import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from './modules/angular-material.module';

import { BannerComponent } from './components/banner/banner.component';
import { FormFieldErrorDirective } from './directives/form-field-error.directive';

@NgModule({
  declarations: [
    BannerComponent,
    FormFieldErrorDirective,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
  ],
  exports: [
    AngularMaterialModule,
    BannerComponent,
    FormFieldErrorDirective,
  ]
})
export class SharedModule { }
