import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { St7Page } from './st7.page';

const routes: Routes = [
  {
    path: '',
    component: St7Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class St7PageRoutingModule {}
