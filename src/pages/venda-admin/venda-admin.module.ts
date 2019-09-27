import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VendaAdminPage } from './venda-admin';

@NgModule({
  declarations: [
    VendaAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(VendaAdminPage),
  ],
})
export class VendaAdminPageModule {}
