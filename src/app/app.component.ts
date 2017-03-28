import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Home } from '../pages/home/home';
import { LoginEmailPage } from '../pages/auth/login-email/login-email';
import { ProfilePage } from '../pages/profile/profile';
import { EarningPage } from '../pages/earning/earning';
import { SpendingPage } from '../pages/spending/spending';
import { HelpPage } from '../pages/help/help';


import { DataProvider } from '../providers/data';
import { AuthProvider } from '../providers/auth';

@Component({
  templateUrl: 'app.html'
})

export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Home;

  constructor(public platform: Platform, protected auth : AuthProvider, protected data : DataProvider) {}

  ngOnInit(){
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.auth.getUserData().subscribe(data => {
        this.nav.setRoot(Home);
      }, err => {
        this.nav.setRoot(LoginEmailPage);

      });
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openProfile() {

    this.nav.push(ProfilePage);
  }

  openHelp(){
    this.nav.push(HelpPage);
  }

   openEarning(){
    this.nav.push(EarningPage);

  }

   openHistory(){
    this.nav.push(SpendingPage);

  }

  logout(){
    this.nav.setRoot(LoginEmailPage);
    this.auth.logout();
  }
}
