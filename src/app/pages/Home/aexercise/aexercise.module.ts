import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AexercisePageRoutingModule } from './aexercise-routing.module';

import { AexercisePage } from './aexercise.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AexercisePageRoutingModule
  ],
  declarations: [AexercisePage]
})
export class AexercisePageModule {}
