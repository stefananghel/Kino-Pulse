import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyworkoutPageRoutingModule } from './myworkout-routing.module';

import { MyworkoutPage } from './myworkout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyworkoutPageRoutingModule
  ],
  declarations: [MyworkoutPage]
})
export class MyworkoutPageModule {}
