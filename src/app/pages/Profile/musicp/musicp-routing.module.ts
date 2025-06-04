import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MusicpPage } from './musicp.page';

const routes: Routes = [
  {
    path: '',
    component: MusicpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicpPageRoutingModule {}
