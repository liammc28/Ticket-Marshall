import { Component } from '@angular/core';
import {App, IonicPage, NavController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the EventHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-home',
  templateUrl: 'event-home.html',
})
export class EventHomePage {

  constructor(public navCtrl: NavController, public authProvider: AuthProvider, public app: App) {
  }


  goToCreate(): void {
    this.navCtrl.push('EventCreatePage');
  }

  goToList(): void {
    this.navCtrl.push('EventListPage');
  }
}
