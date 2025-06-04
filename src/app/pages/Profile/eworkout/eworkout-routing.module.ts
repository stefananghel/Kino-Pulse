import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EworkoutPage } from './eworkout.page';

const routes: Routes = [
  {
    path: '',
    component: EworkoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EworkoutPageRoutingModule {}
