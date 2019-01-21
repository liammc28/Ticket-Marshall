import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import { Camera } from '@ionic-native/camera';
import * as firebase from 'firebase/app'
import 'firebase/storage'


@IonicPage({
  segment: 'event-detail/:eventId'
})
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html'
})
export class EventDetailPage {
  public currentEvent: any = {};
  path: string;
  pathToPicture: string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public eventProvider: EventProvider,
              public cameraPlugin: Camera

  ) {}

  ionViewWillEnter() {
    this.eventProvider
      .getEventDetail(this.navParams.get('eventId'))
      .on('value', eventSnapshot => {
        this.currentEvent = eventSnapshot.val();
        this.currentEvent.id = eventSnapshot.key;
        this.pathToPicture = eventSnapshot.val().genre;
      });

    var ProfilePicture = this.navParams.get('eventId');
    firebase.database().ref(`/images`).once('value',(snapshot) => {
      if(snapshot.val()[ProfilePicture]) {
        this.path=snapshot.val()[ProfilePicture];
      }
    });

    if(!(this.path)){
      if(this.pathToPicture === "Sport"){
        this.path ="assets/img/sport.jpg";
        console.log(this.path);
      }
      else if(this.pathToPicture === "Music"){
        this.path ="assets/img/music.jpg";
        console.log(this.path);
      }
      else if(this.pathToPicture === "Comedy"){
        this.path ="assets/img/comedy.jpg";
        console.log(this.path);
      }
      else if(this.pathToPicture === "Art"){
        this.path ="assets/img/art.jpg";
        console.log(this.path);
      }
      else{
        this.path ="assets/img/other.jpg";
        console.log(this.path);
      }
    }

  }


  takeEventPicture(): void {
    this.cameraPlugin.getPicture({
      quality: 95,
      destinationType: this.cameraPlugin.DestinationType.DATA_URL,
      sourceType: this.cameraPlugin.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: this.cameraPlugin.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(profilePicture => {
      // Send the picture to Firebase Storage/userProfile/${this.results[text]}`
      const selfieRef = firebase.storage().ref(`images/${this.navParams.get('eventId')}`);
      console.log(selfieRef);

      selfieRef.putString(profilePicture, 'base64', {contentType: 'image/png'})
        .then(savedProfilePicture => {
          firebase
            .database()
            .ref(`images/${this.navParams.get('eventId')}`)
            .set(savedProfilePicture.downloadURL);
          this.path = savedProfilePicture.downloadURL;
        });
    });
  }
}


