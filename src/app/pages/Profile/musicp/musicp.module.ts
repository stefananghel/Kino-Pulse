import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MusicpPageRoutingModule } from './musicp-routing.module';

import { MusicpPage } from './musicp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MusicpPageRoutingModule
  ],
  declarations: [MusicpPage]
})
export class MusicpPageModule {}
