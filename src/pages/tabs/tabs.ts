import { Component } from '@angular/core';
import {  NavController } from 'ionic-angular';
// import { AlertController } from 'ionic-angular';

// import { CompraPage } from '../compra/compra';
// import { VendaPage } from '../venda/venda';
import { LancamentoPage } from '../lancamento/lancamento';

// @IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'HomePage';
  tab2Root = 'SaldoPage';
  tab3Root = 'BalancogadoPage';
  tab4Root = 'PerfilPage';
  constructor( public navCtrl: NavController) {

  }
//   presentPrompt() {
//   let alert = this.alertCtrl.create({
//     // title: 'Login',
//     buttons: [
//       {
//         text: 'Compra',
//         handler: data => {
//           this.navCtrl.push(CompraPage);
//         }
//       },
//       {
//         text: 'Venda',
//         handler: data => {
//           this.navCtrl.push(VendaPage);
//         }
//       },{
//         text: 'Lançamento',
//         handler: data => {
//           this.navCtrl.push(LancamentoPage);
//         }
//       }
//     ]
//   });
//   alert.present();
// }
  presentLancamento(){
    this.navCtrl.push(LancamentoPage);
  }
  presentProfile(){
    this.navCtrl.push('PerfilPage');
  }
}
