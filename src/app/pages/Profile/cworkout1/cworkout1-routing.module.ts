import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Cworkout1Page } from './cworkout1.page';

const routes: Routes = [
  {
    path: '',
    component: Cworkout1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Cworkout1PageRoutingModule {}
