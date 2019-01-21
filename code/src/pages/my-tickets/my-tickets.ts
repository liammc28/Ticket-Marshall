import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EventProvider} from "../../providers/event/event";
import firebase from "firebase";
import { User } from '@firebase/auth-types';
import { Reference } from '@firebase/database-types';

/**
 * Generated class for the MyTicketsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-tickets',
  templateUrl: 'my-tickets.html',
})
export class MyTicketsPage {

  userProfile: Reference;
  currentUser: User;
  userListRef: Reference;
  events: Reference;
  eventLists: Array<any>;
  attendingEvents: Array<any>;
  tickets:Array<any>;
  res: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventProvider: EventProvider) {

  }


  ionViewWillEnter() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);
        this.userListRef = firebase.database().ref(`/userProfile/`);
        firebase.database().ref(`/userProfile/${user.uid}`).once('value',(snapshot) => {
          this.attendingEvents= snapshot.val().myEvents;
          this.tickets=snapshot.val().myTickets;
          //console.log(snapshot.val());
          //console.log(this.attendingEvents);
        })
      }
    })
    this.eventLists = [];
    firebase.database().ref('/userProfile/').orderByChild('eventList').once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var list = childSnapshot.val();
          for (var key in list.eventList) {
            if (list.eventList.hasOwnProperty(key)) {
              for(var i =0; i<=this.attendingEvents.length;i++){
                if(this.attendingEvents[i]===key){

                  //number of tickets for this event
                  //this.tickets is the array of tickets
                  //check prefix(this.tickets[i])== key
                  //number of tickets ++
                  var count=0;
                  var res1 ="";
                  for(var y = 1;y<= this.tickets.length-1;y++) {
                     this.res = this.tickets[y];//.toString().substring(0,20);
                    res1 = JSON.stringify(this.res);
                    console.log(res1.substring(1,21));
                    if(res1.substring(1,21)===key) {
                      count = count + 1;
                    }
                  }

                  //console.log(key);
                  const name = "name";
                  const date = "date";
                  const venue = "venue";
                  const price = "price";
                  const description = "description";
                  const genre = "genre";
                  const county = "county";

                  //console.log(list.eventList[key][name]);
                  this.eventLists.push({
                    id:key,
                    name:list.eventList[key][name],
                    date: list.eventList[key][date],
                    venue: list.eventList[key][venue],
                    price: list.eventList[key][price],
                    description: list.eventList[key][description],
                    genre: list.eventList[key][genre],
                    county: list.eventList[key][county],
                    tickets:count//number of tickets to this event
                  })
                }
              }
            }
          }
          return false;
      })
    })
  }

}
