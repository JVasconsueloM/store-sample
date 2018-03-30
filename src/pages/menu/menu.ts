import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MenuController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";


/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  rootPage = 'ProductosPage';

  constructor(public afAuth: AngularFireAuth,
              public navCtrl: NavController,
              public navParams: NavParams,
              public menuCtrl: MenuController) {
    menuCtrl.open();
  }


  async logout(): Promise<any> {
    return this.afAuth.auth.signOut().then(() => {
      this.navCtrl.setRoot('LoginPage');
    });
  }


  openPage(component) {
    this.navCtrl.push(component);
  }
}
