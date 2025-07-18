import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { St3Page } from './st3.page';

const routes: Routes = [
  {
    path: '',
    component: St3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class St3PageRoutingModule {}
