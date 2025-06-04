import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StrainingPageRoutingModule } from './straining-routing.module';

import { StrainingPage } from './straining.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StrainingPageRoutingModule
  ],
  declarations: [StrainingPage]
})
export class StrainingPageModule {}
