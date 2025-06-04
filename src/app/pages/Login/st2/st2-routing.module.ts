import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { St2Page } from './st2.page';

const routes: Routes = [
  {
    path: '',
    component: St2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class St2PageRoutingModule {}
