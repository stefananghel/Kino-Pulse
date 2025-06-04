import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { St3PageRoutingModule } from './st3-routing.module';

import { St3Page } from './st3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    St3PageRoutingModule
  ],
  declarations: [St3Page]
})
export class St3PageModule {}
