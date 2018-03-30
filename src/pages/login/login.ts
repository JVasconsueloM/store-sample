import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase/app';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afAuth: AngularFireAuth) {

  }

  async onLogin() {
    let credentials = this.form.value;
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
      if (result) {
        this.navCtrl.setRoot('MenuPage');
        console.log('log in')
      }
    }
    catch (e) {
      console.error(e);
    }
  }

  onLoginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  onLoginTwitter() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider()).then(
      auth => {console.log(auth)}
    );
  }

  onLoginFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(
      auth => {console.log(auth)}
    );
  }


  onSignup() {

    this.navCtrl.push('SignupPage');
  }


}
