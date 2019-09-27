import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFirestore,AngularFirestoreDocument } from 'angularfire2/firestore';

@IonicPage()
@Component({
  selector: 'page-balancogado',
  templateUrl: 'balancogado.html',
})
export class BalancogadoPage {
  // profile : {} = {};
  myDate: '';
  balancos: Observable<any>;
  private itemDoc: AngularFirestoreDocument<any>;

  confinamento_total = 0;
  pasto_total = 0;
  total_balanco = 0;
  username = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afd: AngularFireDatabase, public fsp: FirebaseServiceProvider
    ,private storage: Storage, public modalCtrl: ModalController,
    public afs: AngularFirestore) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BalancogadoPage');
    this.storage.get('username').then((val) => {
      this.username = val;
      // this.listValores(val);
      this.listValoresFS(val);
    });
  }

  listValoresFS(username){
    this.itemDoc = this.afs.doc<any>('/usuarios/'+username);
    this.balancos = this.itemDoc.collection<any>('balancos',
     ref => ref.orderBy('data', 'asc')).valueChanges();
     console.log("BALANCOS:"+JSON.stringify(this.balancos));
    // this.total_balanco = 0;
    // this.balancos.subscribe(data => {
    //   console.log("GADO Balancos:"+JSON.stringify(data));
    //   data.forEach(item => {
    //     this.calculateBalanco(item);
    //   });
    // });
  }

  // listValores(username){
  //   console.log(this.myDate);
  //   this.balancos = this.afd.list('/usuarios/'+username+'/balancos',ref => ref.orderByChild('data').startAt(this.myDate)).valueChanges();
  //   this.total_balanco = 0;
  //   this.balancos.subscribe(data => {
  //     data.forEach(item => {
  //       this.calculateBalanco(item);
  //     });
  //   });
  // }

  onChange(value: any) {
    this.itemDoc = this.afs.doc<any>('/usuarios/'+this.username);
    this.balancos = this.itemDoc.collection<any>('balancos', ref => {
     return ref
             .where('data', '>=', value)
     }).valueChanges();
    // this.total_balanco = 0;
    // this.balancos.subscribe(data => {
    //   data.forEach(item => {
    //     this.calculateBalanco(item);
    //   });
    // });
  }

  gadoModal(gado){
    let saldoModal = this.modalCtrl.create('GadoModalPage',{farm: gado, role: 'user'});
    saldoModal.present();
  }

  lancamentosModal(balanco){
    let lancamentoModal = this.modalCtrl.create('ModalBalancoPage', {balanco: balanco});
    lancamentoModal.onDidDismiss(data => {
     // console.log("Id:"+data);
     // this.afd.list('/usuarios/'+this.username+'/balancos').remove(data).then(_ => console.log('item deleted!'));
     this.afs.collection('usuarios/'+this.username+'/balancos/').doc(data).delete();

   });
    lancamentoModal.present();
  }
  calculateBalanco(balanco){

    switch(balanco['acao']) {
     case 'Entrada Pasto': {
         this.total_balanco = this.total_balanco + parseInt(balanco['quantidade']);
         break;
       }
     case 'Entrada Confinamento': {
          this.total_balanco = this.total_balanco - parseInt(balanco['quantidade']);
          break;
     }
     case 'Morte/Fatalidade': {
          this.total_balanco = this.total_balanco - parseInt(balanco['quantidade']);
          break;
     }
     case 'Nascimento': {
         this.total_balanco = this.total_balanco + parseInt(balanco['quantidade']);
         break;
       }

     case 'Transferencia Entrada': {
         this.total_balanco = this.total_balanco + parseInt(balanco['quantidade']);
         break;
       }
     case 'Transferencia Saida': {
           this.total_balanco = this.total_balanco - parseInt(balanco['quantidade']);
           break;
         }
     case 'Compra': {
         this.total_balanco = this.total_balanco + parseInt(balanco['quantidade']);
         break;
       }

     case 'Venda': {
          this.total_balanco = this.total_balanco - parseInt(balanco['quantidade']);
          break;
        }
     default: {
        break;
     }
   }
}

teste(acao){
  if(acao === "Venda" || acao === "Transferencia Saida" || acao === "Morte/Fatalidade"){
    return "Saida";
  }
  return "Entrada";
}

}
