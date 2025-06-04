import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CplanPageRoutingModule } from './cplan-routing.module';

import { CplanPage } from './cplan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CplanPageRoutingModule
  ],
  declarations: [CplanPage]
})
export class CplanPageModule {}
