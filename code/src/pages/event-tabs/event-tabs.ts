import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';


/**
 * Generated class for the EventTabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-tabs',
  templateUrl: 'event-tabs.html'
})
export class EventTabsPage {

  homeRoot = 'EventListPage'
  qrScannerRoot = 'QrScannerPage'
  eventsettingsRoot = 'EventSettingsPage'


  constructor(public navCtrl: NavController) {}

}
