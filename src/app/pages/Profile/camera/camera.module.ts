import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CameraRoutingModule } from './camera-routing.module';

import { Camera } from './camera.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CameraRoutingModule
  ],
  declarations: [Camera]
})
export class CameraModule {}
