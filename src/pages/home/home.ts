import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LocationPage } from '../location/location';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {

  constructor(public navCtrl: NavController, public navParams : NavParams) {}

  beQueuer(){
    this.navCtrl.push(LocationPage, {switch : true});
  }

  beBuyer(){
    this.navCtrl.push(LocationPage, {switch : false});
  }

}
