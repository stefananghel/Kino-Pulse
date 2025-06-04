import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { St1PageRoutingModule } from './st1-routing.module';

import { St1Page } from './st1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    St1PageRoutingModule
  ],
  declarations: [St1Page]
})
export class St1PageModule {}
