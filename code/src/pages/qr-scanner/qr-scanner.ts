import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { BarcodeScanner} from "@ionic-native/barcode-scanner";
import firebase from "firebase";
import {EventProvider} from "../../providers/event/event";

/**
 * Generated class for the QrScannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qr-scanner',
  templateUrl: 'qr-scanner.html',
})
export class QrScannerPage {

  results: {};
  attendingEvents: Array<string>;
  tickets: Array<string>;
  myTickets: Array <string>;
  myEvents:Array<string>;
  events:Array<string>;
  statement:string="";
  public eventList: Array<any>;
  users: string;


  constructor(public navCtrl: NavController, private bardcode: BarcodeScanner,public eventProvider: EventProvider) {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.events= [];
        this.users = user.uid;
        firebase.database().ref(`/userProfile/${user.uid}/`).once('value', (snapshot) => {
          var list = snapshot.val();
          for (var key in list.eventList) {
            if (list.eventList.hasOwnProperty(key)) {
              this.events.push(key);
            }
          }
        })

      }
    })
  }


  ionViewWillEnter() {
    //this.statement = this.users;
    this.eventProvider.getEventList().on('value', eventListSnapshot => {
      this.eventList = [];
      eventListSnapshot.forEach(snap => {
        this.eventList.push({
          id: snap.key,
          genre:snap.val().genre,
          name: snap.val().name,
          price: snap.val().price,
          date: snap.val().date,
          venue: snap.val().venue
        });
        return false;
      });
    });
  }



  async scanBarcode(eventId) {
    console.log(this.events);
    this.results = await this.bardcode.scan();
    const text = "text";
   console.log(this.results[text]);
   // ${this.results[text]}
   // this.results="fYruC4wtJpaOqmQdRDAQGdGAV4J3";

    await firebase.database().ref(`/userProfile/${this.results[text]}`).once('value', (snapshot) => {
      this.attendingEvents = snapshot.val().myEvents;
      this.myTickets = snapshot.val().myTickets;
      //console.log(this.attendingEvents);
      //console.log(this.events);
    })
    await firebase.database().ref(`/userProfile/${this.users}/eventList/${eventId}`).once('value', (snapshot) => {
      this.tickets = snapshot.val().tickets;
      console.log(this.tickets);
      console.log(this.myTickets);
    })
    var count = 0;
    console.log(this.attendingEvents);
    for (var i = 0; i <= this.attendingEvents.length - 1; i++) {

      if(eventId == this.attendingEvents[i]) {
        //if in here we have tickets to the event
        //for(var x = 0; x <= this.tickets.length-1; x++){
        //tickets owned by the customer
        //for(var y = 0; y <= )
        for(var x = 0; x <= this.tickets.length -1;x++){
          for(var y = 0; y <= this.myTickets.length -1; y ++){
            if (this.myTickets[y] === this.tickets[x]){
              count = +count +1;
            }
          }
        }
      }
      console.log(count);

    }
    if (count>0){
      this.navCtrl.push('ScannedResultPage',{ count: count });
    }
    else if(count == 0) {
      this.navCtrl.push('NoTicketPage');
    }
  }
}


