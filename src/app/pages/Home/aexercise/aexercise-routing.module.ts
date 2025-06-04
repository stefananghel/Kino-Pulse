import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AexercisePage } from './aexercise.page';

const routes: Routes = [
  {
    path: '',
    component: AexercisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AexercisePageRoutingModule {}
