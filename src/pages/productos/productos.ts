import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, AngularFireAction} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import {Subject} from "rxjs/Subject";
import * as firebase from "firebase/app";

/**
 * Generated class for the ProductosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productos',
  templateUrl: 'productos.html',
})
export class ProductosPage {
  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$ = new Subject<string>();


  constructor(public db: AngularFireDatabase,
              public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController) {

    this.size$ = new BehaviorSubject(null);
    this.items$ = this.size$.switchMap(size =>
      db.list('/productos', ref =>
        size ? ref.orderByChild('nombre').limitToFirst(10).startAt(size).endAt(size + "\uf8ff") : ref
      ).snapshotChanges()
    );
  }


  search($event) {
    let q = $event.target.value;
    this.size$.next(q);
  }

  openDetails(product) {
    let modal = this.modalCtrl.create('ProductosDetailPage', product);
    modal.present();
  }

}
