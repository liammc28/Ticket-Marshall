import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import 'firebase/storage'

@IonicPage()
@Component({
  selector: 'page-event-create',
  templateUrl: 'event-create.html'
})
export class EventCreatePage {
  statement:string="";
  constructor(public navCtrl: NavController,
              public eventProvider: EventProvider)
               {
  }


  createEvent(eventName: string,
              eventDate: string,
              eventDescription: string,
              eventPrice: number,
              numOfTickets: number,
              venue: string,
              county: string,
              genre: string,
              /*savedProfilePicture: string*/
  ): void {
    if(eventName == null ||  eventDate== null || eventDescription== null || eventPrice== null || numOfTickets== null || venue== null || county== null || genre== null){
      //this.statement="Please fill in all fields";
      alert("Please fill in all fields");
    }
    else if(eventPrice >=1 && numOfTickets >=1) {
      //county='Dublin'
      //genre=  'string'
      this.eventProvider
        .createEvent(eventName, eventDate, eventDescription, eventPrice, numOfTickets, 0, venue, county, genre)
        .then(newEvent => {
          this.navCtrl.push('EventTabsPage');
        });
    }
    else{
      /*this.statement = "please enter valid values";*/
      alert("please enter valid values");
    }

  }
}

