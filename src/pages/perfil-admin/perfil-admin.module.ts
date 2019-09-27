import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilAdminPage } from './perfil-admin';

@NgModule({
  declarations: [
    PerfilAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilAdminPage),
  ],
})
export class PerfilAdminPageModule {}
