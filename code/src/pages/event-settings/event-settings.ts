import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the EventSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-settings',
  templateUrl: 'event-settings.html',
})
export class EventSettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public authProvider: AuthProvider, public app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventSettingsPage');
  }

  goToEventProfile(): void {
    this.navCtrl.push('ProfilePage');
  }
  EventLogOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.app.getRootNav().setRoot('LoginPage');
    });
  }
  GoToContact() {
    this.navCtrl.push('ContactPage');
  }
  GoToAbout() {
    this.navCtrl.push('AboutPage');
  }
  GoToPrivacyPolicy(){
    this.navCtrl.push('PrivacyPolicyPage');
  }

  GoToFaq(){
    this.navCtrl.push('EventFaqPage');
  }
}
