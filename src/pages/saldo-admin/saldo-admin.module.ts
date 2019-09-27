import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaldoAdminPage } from './saldo-admin';

@NgModule({
  declarations: [
    SaldoAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(SaldoAdminPage),
  ],
})
export class SaldoAdminPageModule {}
