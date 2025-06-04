import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkrPageRoutingModule } from './workr-routing.module';

import { WorkrPage } from './workr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkrPageRoutingModule
  ],
  declarations: [WorkrPage]
})
export class WorkrPageModule {}
