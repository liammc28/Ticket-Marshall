import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EventProvider} from "../../providers/event/event";
import firebase from 'firebase';
/**
 * Generated class for the UserHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-home',
  templateUrl: 'user-home.html',
})

export class UserHomePage {
  public eventLists: Array<any>;
  public events;
  public items;
  public countryRef: firebase.database.Reference;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventProvider: EventProvider) {
    this.countryRef = firebase.database().ref('/userProfile/eventList')
    this.initializeItems();
  }


  ionViewWillEnter() {
    this.eventLists = [];
    firebase.database().ref('/userProfile/').orderByChild('eventList').once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var list = childSnapshot.val();
        for (var key in list.eventList) {
          if (list.eventList.hasOwnProperty(key)) {
            //console.log(key);
            const name = "name";
            const date = "date";
            const venue = "venue";
            const price = "price";
            const description = "venue";
            const genre = "genre";
            const county = "county";

            //console.log(list.eventList[key][name]);
            this.eventLists.push({
              id: key,
              name: list.eventList[key][name],
              date: list.eventList[key][date],
              venue: list.eventList[key][venue],
              price: list.eventList[key][price],
              description: list.eventList[key][description],
              genre: list.eventList[key][genre],
              county: list.eventList[key][county],

            });
          }
        }
        return false;
      })
    });
  }

  GoToUserEventDetailPage(eventId) {
    this.navCtrl.push('UserEventDetailsPage', {eventId: eventId});
  }

  initializeItems() {
    this.eventLists = this.eventLists;
    console.log(this.eventLists);
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var q = ev.target.value;

    // if the value is an empty string don't filter the items
    if (q && q.trim() != '') {
      this.eventLists = this.eventLists.filter((v) => {
        if (v.name && q) {
          if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
            return true;
          }
          else if (v.genre.toLowerCase().indexOf(q.toLowerCase()) > -1) {
            return true;
          }
          else if (v.venue.toLowerCase().indexOf(q.toLowerCase()) > -1) {
            return true;
          }
          return false;
        }
      });

      console.log(q, this.eventLists.length);

    }
  }
}





