import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkrPage } from './workr.page';

const routes: Routes = [
  {
    path: '',
    component: WorkrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkrPageRoutingModule {}
