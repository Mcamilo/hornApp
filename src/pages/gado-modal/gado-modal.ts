import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore,AngularFirestoreDocument } from 'angularfire2/firestore';

@IonicPage()
@Component({
  selector: 'page-gado-modal',
  templateUrl: 'gado-modal.html',
})
export class GadoModalPage {
  farm:'';
  role = '';
  balancos: Observable<any>;
  balancosTransf: Observable<any>;
  private itemDoc: AngularFirestoreDocument<any>;

  touro = 0;
  boi = 0;
  bezerro = 0;
  vaca_de_leite = 0;
  vaca_de_corte = 0;
  novilha = 0;

  total_balanco = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams,
     public viewCtrl: ViewController, private storage: Storage,
      public afd: AngularFireDatabase, public afs: AngularFirestore) {
        this.farm = navParams.get('farm');
        this.role = navParams.get('role');
    // this.date = navParams.get('date');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GadoModalPage');
    this.storage.get('username').then((val) => {
      console.log('Username:', val);
      this.listValoresFS(val);
    });
  }
  listValoresFS(username){
    if(this.role === "user"){
      this.itemDoc = this.afs.doc<any>('/usuarios/'+username);
      this.balancos = this.itemDoc.collection<any>('balancos').valueChanges();
      this.balancos.subscribe(data => {
        this.touro = 0;
        this.boi = 0;
        this.bezerro = 0;
        this.vaca_de_leite = 0;
        this.vaca_de_corte = 0;
        this.novilha = 0;
        this.total_balanco = 0;
        data.forEach(item => {
          if(item.acao === 'Transferencia Entrada' || item.acao === 'Transferencia Saida'){
            if(item.fazenda_destino === this.farm){
              this.calculateBalanco(item);
            }
          }else{
            if(item.fazenda === this.farm){
              this.calculateBalanco(item);
            }
          }
        });
      });
    }else{
          this.afs.collection('usuarios').get().toPromise()
          .then(snapshot => {
            snapshot.forEach(doc => {
              this.touro = 0;
              this.boi = 0;
              this.bezerro = 0;
              this.vaca_de_leite = 0;
              this.vaca_de_corte = 0;
              this.novilha = 0;
              this.total_balanco = 0;
              // this.itemDoc2 =
              this.afs.doc<any>('usuarios/'+doc.id).collection<any>('balancos').valueChanges().subscribe(data => {
                  data.forEach(item => {
                    if(item.acao === 'Transferencia Entrada' || item.acao === 'Transferencia Saida'){
                      if(item.fazenda_destino === this.farm){
                        this.calculateBalanco(item);
                      }
                    }else{
                      if(item.fazenda === this.farm){
                        this.calculateBalanco(item);
                      }
                    }
                    });
              });
            });
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
    }
  }
  // listValores(username){
  //   this.balancos = this.afd.list('/usuarios/'+username+'/balancos', ref => ref.orderByChild('fazenda').equalTo(this.farm)).valueChanges();
  //
  //   this.balancos.subscribe(data => {
  //     this.touro = 0;
  //     this.boi = 0;
  //     this.bezerro = 0;
  //     this.vaca_de_leite = 0;
  //     this.vaca_de_corte = 0;
  //     this.novilha = 0;
  //     this.total_balanco = 0;
  //     data.forEach(item => {
  //       this.calculateBalanco(item);
  //     });
  //   });
  // }
  calculateBalanco(balanco){

    switch(balanco['animal']) {
     case 'Vaca de Leite': {
       if(balanco['acao'] === "Venda" || balanco['acao'] === "Transferencia Saida"
        || balanco['acao'] === "Morte/Fatalidade"){
         this.vaca_de_leite = this.vaca_de_leite - parseInt(balanco['quantidade']);
         this.total_balanco = this.total_balanco - parseInt(balanco['quantidade']);;
         break;
       }else{
         this.vaca_de_leite = this.vaca_de_leite + parseInt(balanco['quantidade']);
         this.total_balanco = this.total_balanco + parseInt(balanco['quantidade']);;
         break;
       }
     }
     case 'Bezerro': {
       if(balanco['acao'] === "Venda" || balanco['acao'] === "Transferencia Saida"
        || balanco['acao'] === "Morte/Fatalidade"){
          this.bezerro = this.bezerro - parseInt(balanco['quantidade']);
          this.total_balanco = this.total_balanco - parseInt(balanco['quantidade']);;
          break;
       }else{
         this.bezerro = this.bezerro + parseInt(balanco['quantidade']);
         this.total_balanco = this.total_balanco + parseInt(balanco['quantidade']);;
         break;
       }
     }
     case 'Vaca de Corte': {
       if(balanco['acao'] === "Venda" || balanco['acao'] === "Transferencia Saida"
        || balanco['acao'] === "Morte/Fatalidade"){
          this.vaca_de_corte = this.vaca_de_corte - parseInt(balanco['quantidade']);
          this.total_balanco = this.total_balanco - parseInt(balanco['quantidade']);;
          break;
       }else{
         this.vaca_de_corte = this.vaca_de_corte + parseInt(balanco['quantidade']);
         this.total_balanco = this.total_balanco + parseInt(balanco['quantidade']);;
         break;
       }
     }
     case 'Boi': {
       if(balanco['acao'] === "Venda" || balanco['acao'] === "Transferencia Saida"
        || balanco['acao'] === "Morte/Fatalidade"){
          this.boi = this.boi - parseInt(balanco['quantidade']);
          this.total_balanco = this.total_balanco - parseInt(balanco['quantidade']);;
          break;
       }else{
         this.boi = this.boi + parseInt(balanco['quantidade']);
         this.total_balanco = this.total_balanco + parseInt(balanco['quantidade']);;
         break;
       }

     }
     case 'Touro': {
       if(balanco['acao'] === "Venda" || balanco['acao'] === "Transferencia Saida"
        || balanco['acao'] === "Morte/Fatalidade"){
          this.touro = this.touro - parseInt(balanco['quantidade']);
          this.total_balanco = this.total_balanco - parseInt(balanco['quantidade']);;
          break;
       }else{
         this.touro = this.touro + parseInt(balanco['quantidade']);
         this.total_balanco = this.total_balanco + parseInt(balanco['quantidade']);;
         break;
       }

     }
     case 'Novilha': {
       if(balanco['acao'] === "Venda" || balanco['acao'] === "Transferencia Saida"
        || balanco['acao'] === "Morte/Fatalidade"){
          this.novilha = this.novilha - parseInt(balanco['quantidade']);
          this.total_balanco = this.total_balanco - parseInt(balanco['quantidade']);;
          break;
       }else{
         this.novilha = this.novilha + parseInt(balanco['quantidade']);
         this.total_balanco = this.total_balanco + parseInt(balanco['quantidade']);;
         break;
       }
     }
     default: {
        break;
     }
   }
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }
}
