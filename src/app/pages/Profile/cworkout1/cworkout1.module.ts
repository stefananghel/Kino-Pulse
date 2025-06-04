import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Cworkout1PageRoutingModule } from './cworkout1-routing.module';

import { Cworkout1Page } from './cworkout1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Cworkout1PageRoutingModule
  ],
  declarations: [Cworkout1Page]
})
export class Cworkout1PageModule {}
