import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { St4PageRoutingModule } from './st4-routing.module';

import { St4Page } from './st4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    St4PageRoutingModule
  ],
  declarations: [St4Page]
})
export class St4PageModule {}
