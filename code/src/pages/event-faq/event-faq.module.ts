import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventFaqPage } from './event-faq';

@NgModule({
  declarations: [
    EventFaqPage,
  ],
  imports: [
    IonicPageModule.forChild(EventFaqPage),
  ],
})
export class EventFaqPageModule {}
