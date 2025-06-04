import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PtrainingPageRoutingModule } from './ptraining-routing.module';

import { PtrainingPage } from './ptraining.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PtrainingPageRoutingModule
  ],
  declarations: [PtrainingPage]
})
export class PtrainingPageModule {}
