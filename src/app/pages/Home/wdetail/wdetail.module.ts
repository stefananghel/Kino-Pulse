import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WdetailPageRoutingModule } from './wdetail-routing.module';

import { WdetailPage } from './wdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WdetailPageRoutingModule
  ],
  declarations: [WdetailPage]
})
export class WdetailPageModule {}
