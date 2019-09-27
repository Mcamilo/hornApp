import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-home-admin',
  templateUrl: 'home-admin.html',
})
export class HomeAdminPage {
  myDate: '2019';
  balancos: Observable<any>;
  balancosColetivos : Observable<any>;
  // profile : {} = {};
  private itemDoc: AngularFirestoreDocument<any>;
  private itemDoc2: Observable<any>;
  touro = 0;
  boi = 0;
  bezerro = 0;
  vaca_de_leite = 0;
  vaca_de_corte = 0;
  novilha = 0;
  total_balanco = 0;

  touro_coletivo = 0;
  boi_coletivo = 0;
  bezerro_coletivo = 0;
  vaca_de_leite_coletivo = 0;
  vaca_de_corte_coletivo = 0;
  novilha_coletivo = 0;
  total_balanco_coletivo = 0;

  home = '';
  username = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afd: AngularFireDatabase,public afs: AngularFirestore,private storage: Storage) {
    this.home = "individual";
    // this.username = 'J7';
    //adminusername

    this.storage.get('username').then((val) => {
      this.username = val;
      this.listValoresFS(val);
      this.listValoresColetivo();

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeAdminPage');
  }

  listValoresFS(username){
    this.itemDoc = this.afs.doc<any>('/usuarios/'+username);
    this.balancos = this.itemDoc.collection<any>('balancos').valueChanges();
    this.balancos.subscribe(data => {
      // console.log("Balancos:"+JSON.stringify(data));
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

  // listValores(username){
  //   console.log(this.myDate);
  //   this.balancos = this.afd.list('/usuarios/'+username+'/balancos', ref => ref.orderByChild('data').startAt(this.myDate)).valueChanges();
  //   // usando a linha de cima
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

  listValoresColetivo(){

    this.afs.collection('usuarios').get().toPromise()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.touro_coletivo = 0;
        this.boi_coletivo = 0;
        this.bezerro_coletivo = 0;
        this.vaca_de_leite_coletivo = 0;
        this.vaca_de_corte_coletivo = 0;
        this.novilha_coletivo = 0;
        this.total_balanco_coletivo = 0;
        // this.itemDoc2 =
        this.afs.doc<any>('usuarios/'+doc.id).collection<any>('balancos').valueChanges().subscribe(data => {

            console.log('DATA:'+JSON.stringify(data));
            data.forEach(item => {
                console.log('ITEM:'+JSON.stringify(item));
                this.calculateBalancoColetivo(item);
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

    // this.listValoresColetivo();
    this.afs.collection('usuarios').get().toPromise()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.touro_coletivo = 0;
        this.boi_coletivo = 0;
        this.bezerro_coletivo = 0;
        this.vaca_de_leite_coletivo = 0;
        this.vaca_de_corte_coletivo = 0;
        this.novilha_coletivo = 0;
        this.total_balanco_coletivo = 0;
        this.itemDoc2 = this.afs.doc<any>('usuarios/'+doc.id).collection<any>('balancos',ref => {
         return ref
                 .where('data', '>=', value)
         }).valueChanges();
        this.itemDoc2.subscribe(data => {
            console.log('DATA:'+JSON.stringify(data));
            data.forEach(item => {
                console.log('ITEM:'+JSON.stringify(item));
                this.calculateBalancoColetivo(item);
              });
        });
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });

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

  calculateBalancoColetivo(balanco){

    switch(balanco['animal']) {
     case 'Vaca de Leite': {
       if(balanco['acao'] === "Venda" || balanco['acao'] === "Transferencia Saida"
        || balanco['acao'] === "Morte/Fatalidade"){
         this.vaca_de_leite_coletivo = this.vaca_de_leite_coletivo - parseInt(balanco['quantidade']);
         this.total_balanco_coletivo = this.total_balanco_coletivo - parseInt(balanco['quantidade']);;
         break;
       }else{
         this.vaca_de_leite_coletivo = this.vaca_de_leite_coletivo + parseInt(balanco['quantidade']);
         this.total_balanco_coletivo = this.total_balanco_coletivo + parseInt(balanco['quantidade']);;
         break;
       }
     }
     case 'Bezerro': {
       if(balanco['acao'] === "Venda" || balanco['acao'] === "Transferencia Saida"
        || balanco['acao'] === "Morte/Fatalidade"){
          this.bezerro_coletivo = this.bezerro_coletivo - parseInt(balanco['quantidade']);
          this.total_balanco_coletivo = this.total_balanco_coletivo - parseInt(balanco['quantidade']);;
          break;
       }else{
         this.bezerro_coletivo = this.bezerro_coletivo + parseInt(balanco['quantidade']);
         this.total_balanco_coletivo = this.total_balanco_coletivo + parseInt(balanco['quantidade']);;
         break;
       }
     }
     case 'Vaca de Corte': {
       if(balanco['acao'] === "Venda" || balanco['acao'] === "Transferencia Saida"
        || balanco['acao'] === "Morte/Fatalidade"){
          this.vaca_de_corte_coletivo = this.vaca_de_corte_coletivo - parseInt(balanco['quantidade']);
          this.total_balanco_coletivo = this.total_balanco_coletivo - parseInt(balanco['quantidade']);;
          break;
       }else{
         this.vaca_de_corte_coletivo = this.vaca_de_corte_coletivo + parseInt(balanco['quantidade']);
         this.total_balanco_coletivo = this.total_balanco_coletivo + parseInt(balanco['quantidade']);;
         break;
       }
     }
     case 'Boi': {
       if(balanco['acao'] === "Venda" || balanco['acao'] === "Transferencia Saida"
        || balanco['acao'] === "Morte/Fatalidade"){
          this.boi_coletivo = this.boi_coletivo - parseInt(balanco['quantidade']);
          this.total_balanco_coletivo = this.total_balanco_coletivo - parseInt(balanco['quantidade']);;
          break;
       }else{
         this.boi_coletivo = this.boi_coletivo + parseInt(balanco['quantidade']);
         this.total_balanco_coletivo = this.total_balanco_coletivo + parseInt(balanco['quantidade']);;
         break;
       }

     }
     case 'Touro': {
       if(balanco['acao'] === "Venda" || balanco['acao'] === "Transferencia Saida"
        || balanco['acao'] === "Morte/Fatalidade"){
          this.touro_coletivo = this.touro_coletivo - parseInt(balanco['quantidade']);
          this.total_balanco_coletivo = this.total_balanco_coletivo - parseInt(balanco['quantidade']);;
          break;
       }else{
         this.touro_coletivo = this.touro_coletivo + parseInt(balanco['quantidade']);
         this.total_balanco_coletivo = this.total_balanco_coletivo + parseInt(balanco['quantidade']);;
         break;
       }

     }
     case 'Novilha': {
       if(balanco['acao'] === "Venda" || balanco['acao'] === "Transferencia Saida"
        || balanco['acao'] === "Morte/Fatalidade"){
          this.novilha_coletivo = this.novilha_coletivo - parseInt(balanco['quantidade']);
          this.total_balanco_coletivo = this.total_balanco_coletivo - parseInt(balanco['quantidade']);;
          break;
       }else{
         this.novilha_coletivo = this.novilha_coletivo + parseInt(balanco['quantidade']);
         this.total_balanco_coletivo = this.total_balanco_coletivo + parseInt(balanco['quantidade']);;
         break;
       }
     }
     default: {
        break;
     }
   }
  }
}
