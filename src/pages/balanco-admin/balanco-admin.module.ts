import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BalancoAdminPage } from './balanco-admin';

@NgModule({
  declarations: [
    BalancoAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(BalancoAdminPage),
  ],
})
export class BalancoAdminPageModule {}
