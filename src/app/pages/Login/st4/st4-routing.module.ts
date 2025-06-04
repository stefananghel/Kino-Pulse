import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { St4Page } from './st4.page';

const routes: Routes = [
  {
    path: '',
    component: St4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class St4PageRoutingModule {}
