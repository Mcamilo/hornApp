import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GadoModalPage } from './gado-modal';

@NgModule({
  declarations: [
    GadoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(GadoModalPage),
  ],
})
export class GadoModalPageModule {}
