import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PtrainingPage } from './ptraining.page';

const routes: Routes = [
  {
    path: '',
    component: PtrainingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PtrainingPageRoutingModule {}
