import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';

import { AngularMaterialModule } from './modules/angular-material.module';

import { BannerComponent } from './components/banner/banner.component';
import { FormFieldErrorDirective } from './directives/form-field-error.directive';
import { LoadingComponent } from './components/loading/loading.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { AsideMenuComponent } from './components/aside-menu/aside-menu.component';
import { ChartComponent } from './components/chart/chart.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    BannerComponent,
    FormFieldErrorDirective,
    LoadingComponent,
    AlertDialogComponent,
    HeaderComponent,
    BaseLayoutComponent,
    BreadcrumbComponent,
    AsideMenuComponent,
    ChartComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    NgChartsModule,
  ],
  exports: [
    AngularMaterialModule,
    BannerComponent,
    FormFieldErrorDirective,
    LoadingComponent,
    HeaderComponent,
    BaseLayoutComponent,
    BreadcrumbComponent,
    AsideMenuComponent,
    ChartComponent,
    CardComponent,
  ]
})
export class SharedModule { }
