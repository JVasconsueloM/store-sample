import {Component, ViewChild} from '@angular/core';
import {IonicPage, MenuController, NavController, Slides} from 'ionic-angular';

import { Storage } from '@ionic/storage';
/**
 * Generated class for the IntroductionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-introduction',
  templateUrl: 'introduction.html'
})
export class IntroductionPage {
  show: boolean = true;
  @ViewChild('slides') slides: Slides;


  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public storage: Storage
  ) {
    this.storage.set('hasSeenIntroduction', false)
  }

  startApp() {
    this.navCtrl.push('LoginPage').then(() => {
      this.storage.set('hasSeenIntroduction', true)
    })
  }

  onSlideChange(slider: Slides) {
    this.show = !slider.isEnd();
  }


  ionViewWillEnter() {
    this.slides.update();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
