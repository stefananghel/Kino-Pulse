import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CplanPage } from './cplan.page';

const routes: Routes = [
  {
    path: '',
    component: CplanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CplanPageRoutingModule {}
