import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

/**
 * Generated class for the CompraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-compra',
  templateUrl: 'compra.html',
})
export class CompraPage {
  // myDate: String = new Date().toISOString();
  //
  // profile = {
  //   name: '',
  //   role: '',
  //   username: ''
  // };
  //
  // compra = {
  //   a_pagar: 0,
  //   frete : 0,
  //   comissao : 0,
  //   impostos : 0,
  //   type:'Compra',
  //   valor: 0,
  //   data : ''
  // };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController, public fsp: FirebaseServiceProvider) {
    // this.profile = this.fsp.profile;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompraPage');
  }

  finalizar(){
    // this.compra.valor = parseFloat(this.compra.a_pagar)+parseFloat(this.compra.frete)+parseFloat(this.compra.comissao)+parseFloat(this.compra.impostos);

    // this.fsp.pushSaldo(this.compra);
    let alert = this.alertCtrl.create({
        title: 'Sucesso',
        message: 'Registro Salvo com Sucesso',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.pop();
  }
}
