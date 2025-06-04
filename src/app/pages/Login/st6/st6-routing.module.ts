import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { St6Page } from './st6.page';

const routes: Routes = [
  {
    path: '',
    component: St6Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class St6PageRoutingModule {}
