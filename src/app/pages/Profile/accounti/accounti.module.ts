import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountiPageRoutingModule } from './accounti-routing.module';

import { AccountiPage } from './accounti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountiPageRoutingModule
  ],
  declarations: [AccountiPage]
})
export class AccountiPageModule {}
