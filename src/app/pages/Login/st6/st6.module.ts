import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { St6PageRoutingModule } from './st6-routing.module';

import { St6Page } from './st6.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    St6PageRoutingModule
  ],
  declarations: [St6Page]
})
export class St6PageModule {}
