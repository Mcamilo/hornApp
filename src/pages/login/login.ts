import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
// import { AuthProvider } from '../../providers/auth/auth';
// import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from 'angularfire2/firestore';

import { AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AdminPage } from '../admin/admin';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {
    name: '',
    pw: ''
  };
  profile:{} = {};
  // profile : {name: string, role: string, username: string;} = {name: '', role:'', username:''};
  constructor(public navCtrl: NavController, private alertCtrl: AlertController,
    public afd: AngularFireDatabase,private storage: Storage, public afs: AngularFirestore) {
      // this.profile =  this.fdbProvider.profile;
  }

  loginUser() {
    if(this.user.name){
          this.afs.doc<any>('/usuarios/'+this.user.name)
          .collection<any>('perfil').valueChanges().subscribe(data => {
            data.forEach(item => {
              console.log('USER:'+item);
              if(item['role'] === 'admin'){
                if(item['senha'] === this.user.pw){
                  this.storage.set('name', item['nome']);
                  this.storage.set('role', item['role']);
                  this.storage.set('username', item['username']);
                  setTimeout(() =>  {
                    this.navCtrl.setRoot(AdminPage);
                  }, 1500);
                }else{
                  let alert = this.alertCtrl.create({
                    title: 'Login',
                    message: "Usuario ou senha incorretos",
                    buttons: ['OK']
                  });
                  alert.present();
                }
              }else if(item['role'] === 'user'){
                    if(this.user.pw === item['senha']){
                      this.storage.set('name', item['nome']);
                      this.storage.set('role', item['role']);
                      this.storage.set('username', item['username']);
                      setTimeout(() => {
                        this.navCtrl.setRoot(TabsPage);
                      }, 1500);
                    }else{
                      let alert = this.alertCtrl.create({
                        title: 'Login',
                        message: "Usuario ou senha incorretos",
                        buttons: ['OK']
                      });
                      alert.present();
                  }
              }
            });
        });
    }
  }
}
