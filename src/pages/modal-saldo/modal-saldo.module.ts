import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalSaldoPage } from './modal-saldo';

@NgModule({
  declarations: [
    ModalSaldoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalSaldoPage),
  ],
})
export class ModalSaldoPageModule {}
