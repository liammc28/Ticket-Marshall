import { Component } from '@angular/core';
import {App, IonicPage, NavController} from 'ionic-angular';
//import {Welcome} from "../welcome/welcome";
import {AuthProvider} from "../../providers/auth/auth";



/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController,  public authProvider: AuthProvider, public app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  GoUserLogOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.app.getRootNav().setRoot('LoginPage');
    });
  }
  GoToPrivacyPolicy(){
    this.navCtrl.push('PrivacyPolicyPage');
  }
  GoToAbout() {

    this.navCtrl.push('AboutPage');

  }
  GoToFaq(){
    this.navCtrl.push('FaqPage');
  }
  goToProfile(): void {
    this.navCtrl.push('ProfilePage');
  }
  GoToContact(){
    this.navCtrl.push('ContactPage');
  }

}
