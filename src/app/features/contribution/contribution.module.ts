import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from "../../shared/shared.module";

import { ContributionComponent } from './contribution.component';
import { ContributionRoutingModule } from './contribution-routing.module';

@NgModule({
  declarations: [
    ContributionComponent
  ],
  imports: [
    CommonModule,
    ContributionRoutingModule,
    SharedModule
],
  exports: [
    ContributionComponent
  ]
})
export class ContributionModule { }
