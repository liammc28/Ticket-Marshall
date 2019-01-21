import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ScannedResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'scanned-results/:count'
})
@Component({
  selector: 'page-scanned-result',
  templateUrl: 'scanned-result.html',
})
export class ScannedResultPage {

  splash = true;
  result : number;
  statement: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.result=this.navParams.get('count');
  }

  ionViewWillEnter() {
    setTimeout(() => this.splash = false, 4000);
    if(this.result>0){

      this.statement = "The number of tickets to this event is:" + this.result
    }
    else{
      this.statement = "No tickets to this event."
    }

  }

}
