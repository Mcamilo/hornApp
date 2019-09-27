import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VendasModalPage } from './vendas-modal';

@NgModule({
  declarations: [
    VendasModalPage,
  ],
  imports: [
    IonicPageModule.forChild(VendasModalPage),
  ],
})
export class VendasModalPageModule {}
