import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EventProvider} from "../../providers/event/event";
import firebase from "firebase";

/**
 * Generated class for the UserEventDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-event-details',
  templateUrl: 'user-event-details.html',
})
export class UserEventDetailsPage {
  public eventLists: Array<any>;
  public statement : string="";
  path: string;
  genre: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eventProvider: EventProvider
  ) {}

  ionViewWillEnter() {
    console.log('here');
    this.eventLists = [];
    firebase.database().ref('/userProfile/').orderByChild('eventList').once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var list = childSnapshot.val();
        for (var key in list.eventList) {
          if (list.eventList.hasOwnProperty(key)) {
            if (key === this.navParams.get('eventId')) {
              //console.log(key);
              const name = "name";
              const county = "county";
              const date = "date";
              const venue = "venue";
              const price = "price";
              const description = "description";
              const genre = "genre";
              const numOfTickets = "numOfTickets";
              const numOfTicketsSold = "numOfTicketsSold";
              var ticketsLeft = (list.eventList[key][numOfTickets] - list.eventList[key][numOfTicketsSold])
              if (ticketsLeft === 0) {
                //console.log(ticketsLeft);
                this.statement = "Sorry No Tickets On Sale Event is Sold Out ";
              }

              //console.log(list.eventList[key][name]);
              this.eventLists.push({
                id: key,
                name: list.eventList[key][name],
                date: list.eventList[key][date],
                venue: list.eventList[key][venue],
                price: list.eventList[key][price],
                description: list.eventList[key][description],
                genre: list.eventList[key][genre],
                county: list.eventList[key][county]

              });
              this.genre = list.eventList[key][genre];
              var ProfilePicture = this.navParams.get('eventId');
              firebase.database().ref(`/images`).once('value',(snapshot) => {
                if(snapshot.val()[ProfilePicture]) {
                  this.path=snapshot.val()[ProfilePicture];
                }
              });
              if (!(this.path)) {
                console.log(this.genre);
                if (this.genre === "Sport") {
                  this.path = "assets/img/sport.jpg";
                  //console.log(this.path);
                }
                else if (this.genre === "Music") {
                  this.path = "assets/img/music.jpg";
                  //console.log(this.path);
                }
                else if (this.genre === "Comedy") {
                  this.path = "assets/img/comedy.jpg";
                  //console.log(this.path);
                }
                else if (this.genre === "Art") {
                  this.path = "assets/img/art.jpg";
                  //console.log(this.path);
                }
                else {
                  this.path = "assets/img/other.jpg";
                  // console.log(this.path);
                }
              }
            }
          }
        }
        return false;
      })
    })

  }

  GoToPurchaseTicketsPage(eventId){
    this.navCtrl.push('PurchaseTicketsPage' , { eventId: eventId });
  }
}


//



