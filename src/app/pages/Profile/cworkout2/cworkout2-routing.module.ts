import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Cworkout2Page } from './cworkout2.page';

const routes: Routes = [
  {
    path: '',
    component: Cworkout2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Cworkout2PageRoutingModule {}
