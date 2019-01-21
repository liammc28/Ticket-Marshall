import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';
import { AuthProvider } from '../providers/auth/auth';
import { EventProvider } from '../providers/event/event';
import { ProfileProvider } from '../providers/profile/profile';
import { NgxQRCodeModule } from "ngx-qrcode2";
import {QrPage} from "../pages/qr/qr";
import {FormsModule} from "@angular/forms";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {EventHomePage} from "../pages/event-home/event-home";
import 'firebase/storage'


@NgModule({
  // NOTE: KEEP QRPAGE IN DECLARATION AND IMPORTS
  declarations: [MyApp,QrPage,EventHomePage],
  imports: [BrowserModule, IonicModule.forRoot(MyApp),NgxQRCodeModule,FormsModule],
  bootstrap: [IonicApp],
  entryComponents: [MyApp,QrPage,EventHomePage],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    EventProvider,
    ProfileProvider,
    BarcodeScanner,
  ]
})
export class AppModule {}
