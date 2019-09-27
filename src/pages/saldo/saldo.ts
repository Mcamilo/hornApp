import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-saldo',
  templateUrl: 'saldo.html',
})
export class SaldoPage {
  myDate: String = new Date().toISOString();
  saldos: Observable<any>;

  // saldoTotal: '';
  // vendasTotal: '';
  // comprasTotal: '';

  // profile : {} = {};

  saldoTotal = 0;
  comprasTotal = 0;
  vendasTotal = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afd: AngularFireDatabase, public fsp: FirebaseServiceProvider, public modalCtrl: ModalController) {
      // this.profile = this.fsp.profile;
  }

  listValores(){
    // this.saldos = this.afd.list('/usuarios/'+this.profile.username+'/saldos').valueChanges();
    // usando a linha de cima
    // this.saldos.subscribe(data => {
    //   data.forEach(item => {
    //     this.calculateSum(item.valor);
    //   });
    // });
  }

  // calculateSum(value) {
  //   this.saldoTotal = this.saldoTotal + value;
  // }

  calculateCompras() {
    // var compras = this.afd.list('/usuarios/'+this.profile.username+'/saldos', ref => ref.orderByChild('type').equalTo('Compra')).valueChanges();
    // compras.subscribe(data => {
    //   console.log("data"+JSON.stringify(data));
    //   this.comprasTotal = 0;
    //   data.forEach(item => {
    //     console.log("valor"+item.valor);
    //     this.calculateComprasSum(item.valor);
    //   });
    // });
  }
  calculateComprasSum(value){
    // this.comprasTotal = this.comprasTotal + parseInt(value);
  }
  calculateVendas() {
    // var vendas = this.afd.list('/usuarios/'+this.profile.username+'/saldos', ref => ref.orderByChild('type').equalTo('Venda')).valueChanges();
    // vendas.subscribe(data => {
    //   this.vendasTotal = 0;
    //   data.forEach(item => {
    //     this.calculateVendasSum(item.valor);
    //   });
    // });
  }
  calculateVendasSum(value){
    // this.vendasTotal = this.vendasTotal + parseInt(value);
  }
  ionViewDidLoad() {
    // console.log('ionViewDidLoad SaldoPage');
    // this.listValores();
    // this.calculateCompras();
    // this.calculateVendas();
  }
  saldoModal(saldo){
    // console.log("saldo:"+JSON.stringify(saldo));
    // if(saldo.type === "Compra"){
    //     let saldoModal = this.modalCtrl.create('ModalSaldoPage',{userId: saldo});
    //     saldoModal.present();
    // }
  }
}
