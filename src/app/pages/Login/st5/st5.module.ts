import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { St5PageRoutingModule } from './st5-routing.module';

import { St5Page } from './st5.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    St5PageRoutingModule
  ],
  declarations: [St5Page]
})
export class St5PageModule {}
