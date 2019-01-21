import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Reference, ThenableReference } from '@firebase/database-types';


@Injectable()
export class EventProvider {
  public eventListRef: Reference;
  public eventOrganiserUID: string;
  public currentEventOwner: Reference;
  public path: Reference;
  public soldTickets: number;
  public eventLists : Array<any>;
  public arrayTickets : Array<any>;
  public numOfTickets : number;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //console.log(firebase.auth().currentUser);
        this.eventListRef = firebase.database().ref(`/userProfile/${user.uid}/eventList`);
        this.eventOrganiserUID = user.uid;
      }
    })
  }

  createEvent(
    eventName: string,
    eventDate: string,
    eventDescription: string,
    eventPrice: number,
    eventTickets: number,
    eventTicketsSold: number,
    eventVenue: string,
    eventCounty: string,
    eventGenre:string,
    /*eventImage: string,*/
  ): ThenableReference {
    return this.eventListRef.push({
      name: eventName,
      date: eventDate,
      description: eventDescription,
      price: eventPrice,
      numOfTickets: eventTickets,
      numOfTicketsSold:eventTicketsSold,
      venue: eventVenue,
      county: eventCounty,
      genre: eventGenre,
     /* savedProfilePicture: eventImage,*/
      eventOrganisersID:this.eventOrganiserUID,
      tickets: new Array(eventTickets).fill(0)//this.createArray(eventTickets)
    });
  }

  updateArray(eventId: string){

    this.eventLists = [];
    firebase.database().ref('/userProfile/').orderByChild('eventList').once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var list = childSnapshot.val();
        for (var key in list.eventList) {
          if (list.eventList.hasOwnProperty(key)) {
            if (key ===eventId) {
              const numOfTickets = "numOfTickets";
              var tickets : any;
              tickets = "tickets";
              this.arrayTickets = list.eventList[key][tickets];
              this.numOfTickets = list.eventList[key][numOfTickets];
              for(var i = 0; i < this.numOfTickets; i++){
                this.arrayTickets[i]=eventId + "/" + (+i+1);
              }
              tickets = this.arrayTickets;
              this.path.update({tickets});
            }
          }
        }
        return false;
      })
    });
  }

  updateNumberOfSoldTickets(eventId: string, ticketsSold: number): void {
    this.eventLists = [];
    firebase.database().ref('/userProfile/').orderByChild('eventList').once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var list = childSnapshot.val();
        for (var key in list.eventList) {
          if (list.eventList.hasOwnProperty(key)) {
            if (key ===eventId) {
              var numOfTicketsSold: any;
                numOfTicketsSold = "numOfTicketsSold";
              const eventOrganisersID = "eventOrganisersID";
              this.soldTickets = list.eventList[key][numOfTicketsSold];
              this.currentEventOwner = list.eventList[key][eventOrganisersID];
              //console.log("This should always print");
              this.path = firebase.database().ref(`/userProfile/${this.currentEventOwner}/eventList/${eventId}`);
              //console.log(this.path);
              //console.log(this.soldTickets);
              numOfTicketsSold = +this.soldTickets + +ticketsSold;
              this.path.update({numOfTicketsSold});
              this.updateArray(eventId);
            }
          }
        }
        return false;
      })
    });
  }





  createArray(
    numberOfTickets: number,
  ):Array<number> {

    let array = [];
    for (let i = 0; i < numberOfTickets; i++) {
      array[i] = i;
    }
    return array;
  }



  getEventList(): Reference {
    return this.eventListRef;
  }

  getEventDetail(eventId: string): Reference {
    return this.eventListRef.child(eventId);
  }
}
