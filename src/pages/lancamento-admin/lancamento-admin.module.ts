import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LancamentoAdminPage } from './lancamento-admin';

@NgModule({
  declarations: [
    LancamentoAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(LancamentoAdminPage),
  ],
})
export class LancamentoAdminPageModule {}
