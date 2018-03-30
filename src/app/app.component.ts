import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {AngularFireAuth} from "angularfire2/auth";
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;
  notLoggedIntro = "IntroductionPage";
  notLoggedLogin = "LoginPage";
  logged = "MenuPage";

  constructor(
    afAuth: AngularFireAuth,
    storage: Storage,
              platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen
  ) {
    afAuth.authState.subscribe(res => {
      if (res && res.uid) this.rootPage = this.logged;

      else
        storage.get('hasSeenIntroduction').then(hasSeen =>{
          if(hasSeen) this.rootPage = this.notLoggedLogin;
          else this.rootPage = this.notLoggedIntro;
        });



    });


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

