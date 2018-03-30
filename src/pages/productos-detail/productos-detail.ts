import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

/**
 * Generated class for the ProductosDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productos-detail',
  templateUrl: 'productos-detail.html',
})
export class ProductosDetailPage {
  producto_id;
  producto;
  user;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public alertCtrl: AlertController,
              public db: AngularFireDatabase) {

    let item = navParams['data'];
    this.producto_id = item.payload.key;
    this.producto = item.payload.val();
    this.user = firebase.auth().currentUser;
    console.log(this.user)
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


  buy(type) {
    const purchase = this.db.list(`/purchases/${this.user.uid}/`);
    purchase.push({
      type_buy: type,
      favorite: false,
      date: firebase.database.ServerValue.TIMESTAMP,
      description: this.producto.nombre,
      price: this.producto.precio_con_descuento,
      quanty: 1,
      product_uid: this.producto_id
    });


    let alert = this.alertCtrl.create();
    alert.setTitle('¡Gracias!');
    alert.setMessage(
      `
      <img src="assets/svg/balloons.svg">
      
      <p>
        Se desconto ${this.producto.puntos} ptos de tu acumulado, recuerda que pudes seguir
        obteniento puntos al usar tu tarjeta XXXXX
      </p>
      `);
    alert.addButton({
      text: 'Seguir comprando',
      handler: () => {
        this.navCtrl.pop();
      }
    });

    alert.present(alert)
  }
}
