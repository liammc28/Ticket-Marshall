import { Component } from '@angular/core';
import {
  Alert,
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  NavParams,
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import firebase from "firebase";
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  splash = true;
  public loginForm: FormGroup;
  public loading: Loading;
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public navParams: NavParams,
    formBuilder: FormBuilder
  ) {
    this.loginForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }
  ionViewDidLoad(){
    console.log('ionViewDidLoad LoginPage');
    setTimeout(() => {
      this.splash = false;
    }, 4000);}


  goToSignup(): void {
    this.navCtrl.push('SignupPage');
  }

  goToResetPassword(): void {
    this.navCtrl.push('ResetPasswordPage');
  }

  loginUser(): void {
    if (!this.loginForm.valid) {
      console.log(
        `Form is not valid yet, current value: ${this.loginForm.value}`
      );
    } else {

      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      let self = this;
      this.authProvider.loginUser(email, password).then(
        authData => {
          this.loading.dismiss().then(() => {
            firebase.auth().onAuthStateChanged(user => {
              if (user) {
                firebase.database().ref(`/userProfile/${user.uid}/userType`).once("value").then(function (snapshot) {
                  //for programmers to test console.log(snapshot.val())
                  if (snapshot.val()=== 'eventorganiser') {
                    self.navCtrl.setRoot('EventTabsPage');
                  } else {
                    self.navCtrl.setRoot('TabsPage');
                  }
                });
              }
            });
          });
        },
        error => {
          this.loading.dismiss().then(() => {
            const alert: Alert = this.alertCtrl.create({
              message: error.message,
              buttons: [{text: 'Ok', role: 'cancel'}]
            });
            alert.present();
          });
        }
      );
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }
}
