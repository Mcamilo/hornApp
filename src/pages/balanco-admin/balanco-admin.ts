import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { ModalController } from 'ionic-angular';
import { AngularFirestore,AngularFirestoreDocument } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-balanco-admin',
  templateUrl: 'balanco-admin.html',
})
export class BalancoAdminPage {
  myDate: '';
  balancos: Observable<any>;
  private itemDoc: AngularFirestoreDocument<any>;

  confinamento_total = 0;
  pasto_total = 0;
  total_balanco = 0;
  list_balanco = [];
  username = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afd: AngularFireDatabase, public fsp: FirebaseServiceProvider
    , public modalCtrl: ModalController,
    public afs: AngularFirestore,private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BalancoAdminPage');
    this.storage.get('username').then((val) => {
      this.username = val;
      this.listValoresFS();
    });
  }

  listValoresFS(){

    this.afs.collection('usuarios').get().toPromise()
    .then(snapshot => {
      this.list_balanco = [];
      snapshot.forEach(doc => {
        // this.itemDoc = this.afs.doc<any>('usuarios/'+doc.id).collection<any>('balancos', ref => ref.orderBy('data', 'desc')).valueChanges();
        this.afs.doc<any>('usuarios/'+doc.id).collection<any>('balancos', ref => ref.orderBy('data', 'desc')).valueChanges().subscribe(data => {
            data.forEach(item => {
                this.list_balanco.push(item);
              });
        });
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
  }

  onChange(value: any) {
    console.log("Teste"+value);
    // this.listValores();
    this.afs.collection('usuarios').get().toPromise()
    .then(snapshot => {
      this.list_balanco = [];
      snapshot.forEach(doc => {
        // this.itemDoc = this.afs.doc<any>('usuarios/'+doc.id).collection<any>('balancos', ref => ref.orderBy('data', 'desc')).valueChanges();
        this.afs.doc<any>('usuarios/'+doc.id).collection<any>('balancos',
         ref => ref.where('data', '>=', value).orderBy('data', 'desc')).valueChanges().subscribe(data => {
            data.forEach(item => {
                this.list_balanco.push(item);
              });
        });
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
  }

  gadoModal(gado){
    let saldoModal = this.modalCtrl.create('GadoModalPage',{farm: gado, role: 'admin'});
    saldoModal.present();
  }

  lancamentosModal(balanco){
    let lancamentoModal = this.modalCtrl.create('ModalBalancoPage', {balanco: balanco});
    lancamentoModal.onDidDismiss(data => {
     // console.log("Id:"+data);
     if(data !== undefined){
       // this.afd.list('/usuarios/'+this.username+'/balancos').remove(data).then(_ => console.log('item deleted!'));
       console.log("DELETE:"+JSON.stringify(data));
       this.afs.collection('usuarios/'+this.username+'/balancos/').doc(data).delete();
       this.listValoresFS();
     }
   });
    lancamentoModal.present();
  }


teste(acao){
  if(acao === "Venda" || acao === "Transferencia Saida" || acao === "Morte/Fatalidade"){
    return "Saida";
  }
  return "Entrada";
}
usuario(balanco){
  if(balanco.acao === "Transferencia Entrada"){
    return balanco.usuario_destino;
  }
  return balanco.usuario_origem;
}
}
