import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { St2PageRoutingModule } from './st2-routing.module';

import { St2Page } from './st2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    St2PageRoutingModule
  ],
  declarations: [St2Page]
})
export class St2PageModule {}
