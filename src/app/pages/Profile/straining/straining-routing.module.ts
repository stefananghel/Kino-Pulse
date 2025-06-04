import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StrainingPage } from './straining.page';

const routes: Routes = [
  {
    path: '',
    component: StrainingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StrainingPageRoutingModule {}
