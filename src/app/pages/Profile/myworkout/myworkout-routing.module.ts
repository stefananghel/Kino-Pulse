import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyworkoutPage } from './myworkout.page';

const routes: Routes = [
  {
    path: '',
    component: MyworkoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyworkoutPageRoutingModule {}
