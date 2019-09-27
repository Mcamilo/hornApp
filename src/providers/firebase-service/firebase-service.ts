// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingController, AlertController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
@Injectable()
export class FirebaseServiceProvider {

  // profile : {name: string, role: string, username: string;} = {name: '', role:'', username:''};
  profile : {} = {};
  username: string = '';
  constructor(public afd: AngularFireDatabase, public firestore: AngularFirestore,
    public loadingCtrl: LoadingController,
  public alertCtrl: AlertController) {
    console.log('Hello FirebaseServiceProvider Provider');
  }

  isAdmin(credentials){
    console.log("Usuario: "+credentials.name.split("@")[0]);
    if(credentials){
      this.username = credentials.name.split("@")[0];

      this.afd.object('/usuarios/'+this.username+'/perfil').valueChanges().subscribe(data => {
          this.profile = data;
          console.log("Data"+JSON.stringify(this.profile));
          // this.profile.name = data.nome;
          // this.profile.role = data.role;
          // this.profile.username = username;
      });
    }
  }

  pushSaldo(collection){
    // const newSaldoRef = this.afd.list('/usuarios/'+this.username+'/saldos/').push({});
    // return newSaldoRef.set({
    //   id: newSaldoRef.key,
    //   a_pagar:collection.a_pagar,
    //   frete:collection.frete,
    //   comissao:collection.comissao,
    //   impostos:collection.impostos,
    //   data:collection.data,
    //   valor: collection.valor,
    //   type:collection.type
    // });
  }
  pushVenda(collection){
    // const newSaldoRef = this.afd.list('/usuarios/'+this.username+'/saldos/').push({});
    // return newSaldoRef.set({
    //   id: newSaldoRef.key,
    //   gado: collection.gado,
    //   outro: collection.outro,
    //   valor: collection.valor,
    //   data: collection.data,
    //   type: collection.type
    // });
  }


  pushBalanco(collection){
    // const newBalancoRef = this.afd.list('/usuarios/'+collection.username+'/balancos/').push({});
    // return newBalancoRef.set({
    //   id: newBalancoRef.key,
    //   acao:collection.acao,
    //   usuario_origem: collection.username,
    //   fazenda:collection.fazenda,
    //   animal:collection.animal,
    //   quantidade:collection.quantidade,
    //   data:collection.data,
    //   info:collection.info
    // });
  }

  pushFireStoreBalanco(collection){
    const id = this.firestore.createId();
    this.firestore.collection('usuarios/'+collection.username+'/balancos/').doc(id).set({
      id: id,
      acao:collection.acao,
      usuario_origem: collection.username,
      fazenda:collection.fazenda,
      animal:collection.animal,
      quantidade:collection.quantidade,
      data:collection.data,
      info:collection.info
    })
    .then(function() {
        let alert = this.alertCtrl.create({
            title: 'Sucesso',
            message: 'Registro Salvo com Sucesso',
            buttons: ['OK']
          });
          alert.present();
    }.bind(this))
    .catch(function(error) {
      let alert = this.alertCtrl.create({
          title: 'Erro',
          message: error,
          buttons: ['OK']
        });
        alert.present();
    }.bind(this));
  }
  pushBalancoTransf(collection){
    // this.balancos = this.afd.list('/usuarios/'+this.profile.username+'/balancos/');
    const newBalancoRef = this.afd.list('/usuarios/'+collection.username+'/balancos/').push({});
    newBalancoRef.set({
      id: newBalancoRef.key,
      acao: 'Transferencia Saida',
      local_origem: collection.local_origem,
      usuario_origem: collection.usuario_origem,
      fazenda: collection.fazenda_origem,
      usuario_destino:  collection.usuario_destino,
      fazenda_destino:  collection.fazenda_destino,
      local_destino:  collection.local_destino,
      animal:  collection.animal_transf,
      quantidade:  collection.quantidade_transf,
      data:  collection.data_transf,
      info:  collection.info_transf
    });

    const newBalancoRef2 = this.afd.list('/usuarios/'+collection.usuario_destino+'/balancos/').push({});
    newBalancoRef2.set({
      id: newBalancoRef2.key,
      acao: 'Transferencia Entrada',
      local_origem: collection.local_origem,
      usuario_origem: collection.usuario_origem,
      fazenda: collection.fazenda_origem,
      usuario_destino:  collection.usuario_destino,
      fazenda_destino:  collection.fazenda_destino,
      local_destino:  collection.local_destino,
      animal:  collection.animal_transf,
      quantidade:  collection.quantidade_transf,
      data:  collection.data_transf,
      info:  collection.info_transf
    });
  }

  pushFireStoreBalancoTransf(collection){

    const id = this.firestore.createId();
    this.firestore.collection('usuarios/'+collection.username+'/balancos/').doc(id).set({
      id: id,
      acao: 'Transferencia Saida',
      local_origem: collection.local_origem,
      usuario_origem: collection.usuario_origem,
      fazenda: collection.fazenda_origem,
      usuario_destino:  collection.usuario_destino,
      fazenda_destino:  collection.fazenda_destino,
      local_destino:  collection.local_destino,
      animal:  collection.animal_transf,
      quantidade:  collection.quantidade_transf,
      data:  collection.data_transf,
      info:  collection.info_transf
    })
    .then(function() {
      const id2 = this.firestore.createId();
      this.firestore.collection('usuarios/'+collection.usuario_destino+'/balancos/').doc(id2).set({
        id: id2,
        acao: 'Transferencia Entrada',
        local_origem: collection.local_origem,
        usuario_origem: collection.usuario_origem,
        fazenda: collection.fazenda_destino,
        usuario_destino:  collection.usuario_destino,
        fazenda_origem:  collection.fazenda_origem,
        local_destino:  collection.local_destino,
        animal:  collection.animal_transf,
        quantidade:  collection.quantidade_transf,
        data:  collection.data_transf,
        info:  collection.info_transf
      }).then(function() {
          let alert = this.alertCtrl.create({
              title: 'Sucesso',
              message: 'Registro Salvo com Sucesso',
              buttons: ['OK']
            });
            alert.present();
      }.bind(this))
      .catch(function(error) {
        let alert = this.alertCtrl.create({
            title: 'Erro',
            message: error,
            buttons: ['OK']
          });
          alert.present();
      }.bind(this));

    }.bind(this))
    .catch(function(error) {
      let alert = this.alertCtrl.create({
          title: 'Erro',
          message: error,
          buttons: ['OK']
        });
        alert.present();
    }.bind(this));
  }


  pushBalancoTransfAdmin(collection){
    // const newBalancoRef = this.afd.list('/usuarios/'+collection.usuario_origem+'/balancos/').push({});
    // newBalancoRef.set({
    //   id: newBalancoRef.key,
    //   acao: 'Transferencia Saida',
    //   local_origem: collection.local_origem,
    //   usuario_origem: collection.usuario_origem,
    //   fazenda: collection.fazenda_origem,
    //   usuario_destino:  collection.usuario_destino,
    //   fazenda_destino:  collection.fazenda_destino,
    //   local_destino:  collection.local_destino,
    //   animal:  collection.animal_transf,
    //   quantidade:  collection.quantidade_transf,
    //   data:  collection.data_transf,
    //   info:  collection.info_transf
    // });
    //
    // const newBalancoRef2 = this.afd.list('/usuarios/'+collection.usuario_destino+'/balancos/').push({});
    // newBalancoRef2.set({
    //   id: newBalancoRef2.key,
    //   acao: 'Transferencia Entrada',
    //   local_origem: collection.local_origem,
    //   usuario_origem: collection.usuario_origem,
    //   fazenda: collection.fazenda_origem,
    //   usuario_destino:  collection.usuario_destino,
    //   fazenda_destino:  collection.fazenda_destino,
    //   local_destino:  collection.local_destino,
    //   animal:  collection.animal_transf,
    //   quantidade:  collection.quantidade_transf,
    //   data:  collection.data_transf,
    //   info:  collection.info_transf
    // });
  }
  pushFireStoreBalancoAdmin(collection){
    const id = this.firestore.createId();
    this.firestore.collection('usuarios/'+collection.usuario+'/balancos/').doc(id).set({
      id: id,
      acao:collection.acao,
      usuario_origem: collection.usuario,
      fazenda:collection.fazenda,
      animal:collection.animal,
      quantidade:collection.quantidade,
      data:collection.data,
      info:collection.info
    })
    .then(function() {
        let alert = this.alertCtrl.create({
            title: 'Sucesso',
            message: 'Registro Salvo com Sucesso',
            buttons: ['OK']
          });
          alert.present();
    }.bind(this))
    .catch(function(error) {
      let alert = this.alertCtrl.create({
          title: 'Erro',
          message: error,
          buttons: ['OK']
        });
        alert.present();
    }.bind(this));
  }
  pushFireStoreBalancoTransfAdmin(collection){

    const id = this.firestore.createId();
    this.firestore.collection('usuarios/'+collection.usuario_origem+'/balancos/').doc(id).set({
      id: id,
      acao: 'Transferencia Saida',
      local_origem: collection.local_origem,
      usuario_origem: collection.usuario_origem,
      fazenda: collection.fazenda_origem,
      usuario_destino:  collection.usuario_destino,
      fazenda_destino:  collection.fazenda_destino,
      local_destino:  collection.local_destino,
      animal:  collection.animal_transf,
      quantidade:  collection.quantidade_transf,
      data:  collection.data_transf,
      info:  collection.info_transf
    })
    .then(function() {
      const id2 = this.firestore.createId();
      this.firestore.collection('usuarios/'+collection.usuario_destino+'/balancos/').doc(id2).set({
        id: id2,
        acao: 'Transferencia Entrada',
        local_origem: collection.local_origem,
        usuario_origem: collection.usuario_origem,
        fazenda: collection.fazenda_destino,
        usuario_destino:  collection.usuario_destino,
        fazenda_origem:  collection.fazenda_origem,
        local_destino:  collection.local_destino,
        animal:  collection.animal_transf,
        quantidade:  collection.quantidade_transf,
        data:  collection.data_transf,
        info:  collection.info_transf
      }).then(function() {
          let alert = this.alertCtrl.create({
              title: 'Sucesso',
              message: 'Registro Salvo com Sucesso',
              buttons: ['OK']
            });
            alert.present();
      }.bind(this))
      .catch(function(error) {
        let alert = this.alertCtrl.create({
            title: 'Erro',
            message: error,
            buttons: ['OK']
          });
          alert.present();
      }.bind(this));

    }.bind(this))
    .catch(function(error) {
      let alert = this.alertCtrl.create({
          title: 'Erro',
          message: error,
          buttons: ['OK']
        });
        alert.present();
    }.bind(this));
  }

}
