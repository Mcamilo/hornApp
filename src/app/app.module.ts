import { NgModule, ErrorHandler,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';

import { CompraPage } from '../pages/compra/compra';
import { VendaPage } from '../pages/venda/venda';
import { LancamentoPage } from '../pages/lancamento/lancamento';
import { DespesaPage } from '../pages/despesa/despesa';
import { CompraAdminPage } from '../pages/compra-admin/compra-admin';
import { VendaAdminPage } from '../pages/venda-admin/venda-admin';
import { LancamentoAdminPage } from '../pages/lancamento-admin/lancamento-admin';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import {AdminPage} from '../pages/admin/admin';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';

import { IonicStorageModule } from '@ionic/storage';

var firebaseConfig = {
  apiKey: "AIzaSyC-Z2C3WwNggyZ3vI7Zp0Tvs8T6SNlEUjI",
  authDomain: "hornapp-64713.firebaseapp.com",
  databaseURL: "https://hornapp-64713.firebaseio.com",
  projectId: "hornapp-64713",
  storageBucket: "",
  messagingSenderId: "135855739568"
  };

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    AdminPage,
    CompraPage,
    VendaPage,
    LancamentoPage,
    CompraAdminPage,
    VendaAdminPage,
    LancamentoAdminPage,
    DespesaPage
  ],
  imports: [
    BrowserModule,
   AngularFireDatabaseModule,
   AngularFireAuthModule,
   AngularFireModule.initializeApp(firebaseConfig),
   AngularFirestoreModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFirestoreModule.enablePersistence({experimentalTabSynchronization:true})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    AdminPage,
    CompraPage,
    VendaPage,
    LancamentoPage,
    CompraAdminPage,
    VendaAdminPage,
    LancamentoAdminPage,
    DespesaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    FirebaseServiceProvider,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
