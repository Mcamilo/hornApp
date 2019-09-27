import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { LancamentoAdminPage } from '../lancamento-admin/lancamento-admin';

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})
export class AdminPage {

  homeAdminRoot = 'HomeAdminPage';
  saldoAdminRoot = 'SaldoAdminPage';
  balancoAdminRoot = 'BalancoAdminPage';
  perfilAdminRoot = 'PerfilAdminPage';


  constructor(private alertCtrl: AlertController, public navCtrl: NavController) {}

  presentLancamento(){
    this.navCtrl.push(LancamentoAdminPage);
  }

  presentProfile(){
    this.navCtrl.push('PerfilAdminPage');
  }
}
