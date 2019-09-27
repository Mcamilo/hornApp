import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompraAdminPage } from './compra-admin';

@NgModule({
  declarations: [
    CompraAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(CompraAdminPage),
  ],
})
export class CompraAdminPageModule {}
