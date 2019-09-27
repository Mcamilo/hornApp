import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the CompraAdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-compra-admin',
  templateUrl: 'compra-admin.html',
})
export class CompraAdminPage {
  myDate: String = new Date().toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompraAdminPage');
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
