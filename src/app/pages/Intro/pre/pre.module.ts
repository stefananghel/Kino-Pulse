import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrePageRoutingModule } from './pre-routing.module';

import { PrePage } from './pre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrePageRoutingModule
  ],
  declarations: [PrePage]
})
export class PrePageModule {}
