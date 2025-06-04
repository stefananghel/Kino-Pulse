import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WdetailPage } from './wdetail.page';

const routes: Routes = [
  {
    path: '',
    component: WdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WdetailPageRoutingModule {}
