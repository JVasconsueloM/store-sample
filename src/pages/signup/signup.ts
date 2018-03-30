import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  form: FormGroup;

  constructor(private afAuth: AngularFireAuth, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async onSignup() {
    let credentials = this.form.value;
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        credentials.email,
        credentials.password
      );
      if (result) {
        this.navCtrl.setRoot('MenuPage');
      }
    } catch (e) {
      console.error(e);
    }
  }

  onLogin(){
    this.navCtrl.pop();
  }
}
