import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { User, AuthCredential } from '@firebase/auth-types';
import { Reference } from '@firebase/database-types';

@Injectable()
export class ProfileProvider {
  userProfile: Reference;
  currentUser: User;
  userListRef: Reference;
  events: Reference;
  eventLists: Array<string>;
  attendingEvents: Array<string>;
  tickets: Array<string>;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);
        this.userListRef = firebase.database().ref(`/userProfile/`);
        firebase.database().ref(`/userProfile/${user.uid}`).once('value',(snapshot) => {
          this.attendingEvents= snapshot.val().myEvents;
          this.tickets=snapshot.val().myTickets;

          //console.log(snapshot.val().myEvents);
          //console.log(this.attendingEvents);
        })

      }
    })
  }

  getUserProfile(): Reference {
    return this.userProfile;
  }

  makeMyEvents(): Promise<any>{
    var myEvents: Array<string> = [];
    myEvents[0] = "events";
    return this.userProfile.update({ myEvents});
  }

  makeMyTickets(): Promise<any>{
    var myTickets: Array<string> = [];
    myTickets[0] = "tickets"
    return this.userProfile.update({myTickets});

  }

  updateName(firstName: string, lastName: string): Promise<any> {
    return this.userProfile.update({ firstName, lastName });
  }

  updateDOB(birthDate: string): Promise<any> {
    return this.userProfile.update({ birthDate });
  }
  updateUserType(userType: string): Promise<any> {
    if(userType==="customer"){
      this.makeMyTickets();
      this.makeMyEvents();

    }
    return this.userProfile.update({userType});
  }

  updateEvents(eventId: string) {
    firebase.database().ref(`/userProfile/${this.currentUser.uid}`).once('value',(snapshot) => {
      this.attendingEvents=snapshot.val().myEvents;
    })
    //console.log(this.attendingEvents);
    var myEvents = this.attendingEvents;
    console.log(eventId);
    var isPresent = false;
    for(var i= 0; i <=this.attendingEvents.length -1; i++){
      if(this.attendingEvents[i]===eventId){
        isPresent = true;
      }
    }
    if(!isPresent){
      myEvents.push(eventId);
    }
    return this.userProfile.update({myEvents});
  }

  updateTickets(eventId: string, numOfTickets: number, startingIndex: number){
    firebase.database().ref(`/userProfile/${this.currentUser.uid}`).once('value',(snapshot) => {
      this.tickets=snapshot.val().myTickets;
    })

    var myTickets = this.tickets;
    console.log(myTickets);

    for(var i= +startingIndex + +1;i<=(+numOfTickets + +startingIndex);i++){
      var ticket = eventId + "/" + i;
      console.log(ticket);
      myTickets.push(ticket);
      console.log(myTickets);
    }
    return this.userProfile.update({myTickets});

  }

  updateEmail(newEmail: string, password: string): Promise<any> {
    const credential: AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      password
    );
    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(user => {
        this.currentUser.updateEmail(newEmail).then(user => {
          this.userProfile.update({ email: newEmail });
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  updatePassword(newPassword: string, oldPassword: string): Promise<any> {
    const credential: AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      oldPassword
    );

    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(user => {
        this.currentUser.updatePassword(newPassword).then(user => {
          console.log('Password Changed');
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
}
