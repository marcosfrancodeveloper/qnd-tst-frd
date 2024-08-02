import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { ContributionComponent } from './contribution.component';

const routes: Routes = [
  {
    path: '',
    component: ContributionComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContributionRoutingModule { }
