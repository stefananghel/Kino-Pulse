import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SworkoutPageRoutingModule } from './sworkout-routing.module';

import { SworkoutPage } from './sworkout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SworkoutPageRoutingModule
  ],
  declarations: [SworkoutPage]
})
export class SworkoutPageModule {}
