import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  myDate: '2019';
  balancos: Observable<any>;
  private itemDoc: AngularFirestoreDocument<any>;
  profile : {} = {};

  touro = 0;
  boi = 0;
  bezerro = 0;
  vaca_de_leite = 0;
  vaca_de_corte = 0;
  novilha = 0;

  total_balanco = 0;

  username = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public fsp: FirebaseServiceProvider
    ,private storage: Storage,public afd: AngularFireDatabase,public afs: AngularFirestore) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.storage.get('username').then((val) => {
      console.log('Username:', val);
      this.username = val;
      // this.listValores(val);
      this.listValoresFS(val);
    });
  }

  listValoresFS(username){
    this.itemDoc = this.afs.doc<any>('/usuarios/'+username);
    this.balancos = this.itemDoc.collection<any>('balancos').valueChanges();
    this.balancos.subscribe(data => {
      console.log("Balancos:"+JSON.stringify(data));
      this.touro = 0;
      this.boi = 0;
      this.bezerro = 0;
      this.vaca_de_leite = 0;
      this.vaca_de_corte = 0;
      this.novilha = 0;
      this.total_balanco = 0;
      data.forEach(item => {
        this.calculateBalanco(item);
      });
    });
  }

  listValores(username){

    console.log(JSON.stringify(this.myDate));

    this.balancos = this.afd.list('/usuarios/'+username+'/balancos', ref => ref.orderByChild('data').startAt(this.myDate)).valueChanges();
    // usando a linha de cima

    this.balancos.subscribe(data => {
      this.touro = 0;
      this.boi = 0;
      this.bezerro = 0;
      this.vaca_de_leite = 0;
      this.vaca_de_corte = 0;
      this.novilha = 0;
      this.total_balanco = 0;
      data.forEach(item => {
        this.calculateBalanco(item);
      });
    });
  }
  onChange(value: any) {
    console.log("Teste"+value);
    // this.listValoresFS(this.username);
    this.itemDoc = this.afs.doc<any>('/usuarios/'+this.username);
    this.balancos = this.itemDoc.collection<any>('balancos',ref => {
     return ref
             .where('data', '>=', value)
     }).valueChanges();
    this.balancos.subscribe(data => {
      console.log("Balancos:"+JSON.stringify(data));
      this.touro = 0;
      this.boi = 0;
      this.bezerro = 0;
      this.vaca_de_leite = 0;
      this.vaca_de_corte = 0;
      this.novilha = 0;
      this.total_balanco = 0;
      data.forEach(item => {
        this.calculateBalanco(item);
      });
    });
  }
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

}
