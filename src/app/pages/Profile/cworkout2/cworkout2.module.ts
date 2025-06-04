import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Cworkout2PageRoutingModule } from './cworkout2-routing.module';

import { Cworkout2Page } from './cworkout2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Cworkout2PageRoutingModule
  ],
  declarations: [Cworkout2Page]
})
export class Cworkout2PageModule {}
