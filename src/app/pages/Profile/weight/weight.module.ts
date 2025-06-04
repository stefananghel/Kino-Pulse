import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeightPageRoutingModule } from './weight-routing.module';

import { WeightPage } from './weight.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeightPageRoutingModule
  ],
  declarations: [WeightPage]
})
export class WeightPageModule {}
