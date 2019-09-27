import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

/**
 * Generated class for the ModalBalancoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-balanco',
  templateUrl: 'modal-balanco.html',
})
export class ModalBalancoPage {
  balanco:'';
  regular:boolean = false;
  transf: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    this.balanco = navParams.get('balanco');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalBalancoPage');
    this.setModal();
  }
  dismiss(param){
    this.viewCtrl.dismiss(param);
  }
  setModal(){
    if(this.balanco['acao'] === "Transferencia Saida" || this.balanco['acao'] === "Transferencia Entrada"){
      this.transf = true;
      this.regular = false;
    }else{
      this.regular = true;
      this.transf = false;
    }
  }

}
