import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

/**
 * Generated class for the VendaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-venda',
  templateUrl: 'venda.html',
})
export class VendaPage {
  myDate: String = new Date().toISOString();

  // profile : {} = {};


  venda = {
    gado : 0,
    outro : 0,
    valor: 0,
    data: '',
    type: 'Venda'
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController, public fsp: FirebaseServiceProvider) {
      // this.profile = this.fsp.profile;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendaPage');
  }
  finalizar(){
    // this.venda.valor = parseFloat(this.venda.gado)+parseFloat(this.venda.outro);
    // this.fsp.pushVenda(this.venda);
    let alert = this.alertCtrl.create({
        title: 'Sucesso',
        message: 'Registro Salvo com Sucesso',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.pop();
  }
}
