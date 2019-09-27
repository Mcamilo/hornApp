import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalSaldoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-saldo',
  templateUrl: 'modal-saldo.html',
})
export class ModalSaldoPage {
  userId: '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.userId = navParams.get('userId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalSaldoPage');
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
}
