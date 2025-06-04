import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrePage } from './pre.page';

const routes: Routes = [
  {
    path: '',
    component: PrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrePageRoutingModule {}
