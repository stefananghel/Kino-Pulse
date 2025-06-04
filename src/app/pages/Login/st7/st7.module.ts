import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { St7PageRoutingModule } from './st7-routing.module';

import { St7Page } from './st7.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    St7PageRoutingModule
  ],
  declarations: [St7Page]
})
export class St7PageModule {}
