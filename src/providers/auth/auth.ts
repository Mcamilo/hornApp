// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';

// export interface User{
//   name: string;
//   role: number;
// }
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  // currentUser: User;

  constructor(public afAuth: AngularFireAuth) {

  }

  logout(){
    // this.currentUser = null;
    this.afAuth.auth.signOut();
  }

  // isAdmin(){
  //   return this.currentUser.role === 0;
  // }

  login(credentials) {
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.name, credentials.pw);
    // return this.afAuth.auth.signInWithEmailAndPassword('matheuscmilo@gmail.com', 'esqueci123');

  }

}
