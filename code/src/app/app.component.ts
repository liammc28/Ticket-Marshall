import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { firebaseConfig } from './credentials';
import { Unsubscribe } from '@firebase/util';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage: any;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    firebase.initializeApp(firebaseConfig);
    let self = this;
    const unsubscribe: Unsubscribe = firebase
      .auth()
      .onAuthStateChanged(user => {
        if (user) {
          firebase.database().ref(`/userProfile/${user.uid}/userType`).once("value").then(function (snapshot) {
            /*console.log(snapshot.val());
            console.log(snapshot.val().userType);*/
            if (snapshot.val()=== 'eventorganiser') {
              self.rootPage = 'EventTabsPage';
            } else {
              self.rootPage = 'TabsPage'
            }
          });
        } else {
          self.rootPage = 'LoginPage';
          unsubscribe();
        }
      });


        platform.ready().then(() => {
          statusBar.styleDefault();
          splashScreen.hide();
        });
      }
    }
