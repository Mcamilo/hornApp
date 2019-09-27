import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-perfil-admin',
  templateUrl: 'perfil-admin.html',
})
export class PerfilAdminPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authProvider: AuthProvider, private appCtrl: App, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilAdminPage');
  }
  logout(){
    this.storage.clear();
    this.authProvider.logout();
    this.appCtrl.getRootNav().setRoot('LoginPage');
  }
}
