import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from "firebase";
import {EventProvider} from "../../providers/event/event";
import {ProfileProvider} from "../../providers/profile/profile";

declare var Stripe;
/**
 * Generated class for the PurchaseTicketsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'purchase-tickets/:eventId'
})
@Component({
  selector: 'page-purchase-tickets',
  templateUrl: 'purchase-tickets.html',
})
export class PurchaseTicketsPage {
  stripe = Stripe('pk_test_w0s0TR7112oIYGyvp9rVm12V');
  card: any;
  public soldTickets: number;
  public numberTickets: number;
  public statement: string="";
  public statement1: string="";
  public num: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,public eventProvider:EventProvider,public profileProvider:ProfileProvider) {
  }

  ionViewWillEnter() {
    this.setupStripe();

    firebase.database().ref('/userProfile/').orderByChild('eventList').once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var list = childSnapshot.val();
        const numOfTicketsSold = "numOfTicketsSold";
        const numOfTickets = "numOfTickets";
        for (var key in list.eventList) {
          if (list.eventList.hasOwnProperty(key)) {
            if (key === this.navParams.get('eventId')) {

              this.soldTickets = list.eventList[key][numOfTicketsSold];
              this.numberTickets = list.eventList[key][numOfTickets];
              console.log(this.soldTickets);
              console.log(this.numberTickets);
              const ticketsAvailable = (this.numberTickets - this.soldTickets);
              if (ticketsAvailable<=4){
                if(ticketsAvailable === 4){
                  this.statement="Only 4 Tickets Left";
                }
                else if(ticketsAvailable === 3){
                  this.statement="Only 3 Tickets Left";
                }
                else if(ticketsAvailable === 2){
                  this.statement="Only 2 Tickets Left";
                }
                else{
                  this.statement="Only 1 Tickets Left";
                }

              }
            }
          }
        }
        return false;
      })
    })
  }
  purchase(num: number){
    this.num = num;
    if(!num || num <= 0){
      this.statement1="Please enter a valid number of tickets."
    }
    else if (num <=4){
      firebase.database().ref('/userProfile/').orderByChild('eventList').once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var list = childSnapshot.val();
          const numOfTicketsSold ="numOfTicketsSold";
          const numOfTickets = "numOfTickets";
          for (var key in list.eventList) {
            if (list.eventList.hasOwnProperty(key)) {
              if (key ===this.navParams.get('eventId')) {

                this.soldTickets = list.eventList[key][numOfTicketsSold];
                this.numberTickets = list.eventList[key][numOfTickets];


                console.log("number of tickets already sold: " + this.soldTickets);          //4
                console.log("number of tickets being bought: " + num);                      //3
                console.log("total number of tickets for event: " + this.numberTickets);    //11
                console.log((+this.soldTickets + +num));


                if ((+this.soldTickets + +num) <= this.numberTickets) {
                  console.log("I should be in here");
                  this.profileProvider.updateTickets(key, num, this.soldTickets);
                  this.eventProvider.updateNumberOfSoldTickets(this.navParams.get('eventId'), num);
                  this.profileProvider.updateEvents(this.navParams.get('eventId'));
                  this.navCtrl.setRoot('TabsPage');
                }
                else{
                  this.statement1 = "Not enough tickets available."
                }

              }
            }
          }
          return false;
        })
      })
    }
    else
      this.statement1="You Can't Buy More Than 4 Tickets"
  }

  setupStripe(){
    let elements = this.stripe.elements();
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    this.card = elements.create('card', { style: style });

    this.card.mount('#card-element');

    this.card.addEventListener('change', event => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    var form = document.getElementById('payment-form');
    form.addEventListener('submit', event => {
      event.preventDefault();

      // this.stripe.createToken(this.card)
      this.stripe.createSource(this.card).then(result => {
        if (result.error) {
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          this.navCtrl.push('AboutPage');
        }
      });
    });

  }

}
