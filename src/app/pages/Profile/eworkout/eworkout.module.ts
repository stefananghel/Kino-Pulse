import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EworkoutPageRoutingModule } from './eworkout-routing.module';

import { EworkoutPage } from './eworkout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EworkoutPageRoutingModule
  ],
  declarations: [EworkoutPage]
})
export class EworkoutPageModule {}
