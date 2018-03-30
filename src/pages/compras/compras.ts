import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the ComprasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-compras',
  templateUrl: 'compras.html',
})
export class ComprasPage {
  purchases: Observable<any[]>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase) {
    this.purchases = this.db.list(`/purchases/${firebase.auth().currentUser.uid}/`).valueChanges();
  }

  pad(s) { return (s < 10) ? '0' + s : s; }
  convertDate(item) {
    var d = new Date(item.date);
    if(d){
      item.timestamp_format = [
          this.pad((d.getMonth() + 1)),
          this.pad(d.getDate()),
          d.getFullYear()].join('/') + ' ' +
        [
          this.pad(d.getHours()),
          this.pad(d.getMinutes()),
          this.pad(d.getSeconds())
        ].join(':');

      return item.timestamp_format
    }
    return '-'
  }
}
