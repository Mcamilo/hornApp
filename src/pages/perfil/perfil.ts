import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , App} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  profile : {} = {};
  name: string = "";
  role: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authProvider: AuthProvider, private appCtrl: App, public fsp: FirebaseServiceProvider
    ,private storage: Storage) {
    this.profile = this.fsp.profile;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
    this.storage.get('name').then((val) => {
      this.name = val;
    });
    this.storage.get('role').then((val) => {
      this.role = val;
    });
  }
  logout(){
    this.storage.clear();
    this.authProvider.logout();
    this.appCtrl.getRootNav().setRoot('LoginPage');
  }
}
