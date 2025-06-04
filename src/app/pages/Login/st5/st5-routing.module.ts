import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { St5Page } from './st5.page';

const routes: Routes = [
  {
    path: '',
    component: St5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class St5PageRoutingModule {}
