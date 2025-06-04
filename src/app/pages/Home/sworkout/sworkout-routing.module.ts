import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SworkoutPage } from './sworkout.page';

const routes: Routes = [
  {
    path: '',
    component: SworkoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SworkoutPageRoutingModule {}
