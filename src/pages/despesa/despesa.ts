import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the DespesaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-despesa',
  templateUrl: 'despesa.html',
})
export class DespesaPage {
  myDate: String = new Date().toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DespesaPage');
  }
  finalizar(){
    let alert = this.alertCtrl.create({
      title: 'Failed',
      message: 'No Database Found',
      buttons: ['OK']
    });
    alert.present();
  }
}
