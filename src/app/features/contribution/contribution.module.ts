import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContributionComponent } from './contribution.component';
import { ContributionItemComponent } from './item/item.component';

@NgModule({
  declarations: [
    ContributionComponent,
    ContributionItemComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ContributionComponent
  ]
})
export class ContributionModule { }
