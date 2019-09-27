import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalBalancoPage } from './modal-balanco';

@NgModule({
  declarations: [
    ModalBalancoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalBalancoPage),
  ],
})
export class ModalBalancoPageModule {}
