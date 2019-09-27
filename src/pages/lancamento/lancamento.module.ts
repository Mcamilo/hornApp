import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LancamentoPage } from './lancamento';

@NgModule({
  declarations: [
    LancamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(LancamentoPage),
  ],
})
export class LancamentoPageModule {}
