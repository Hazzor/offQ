import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { Home } from '../home/home';
import { Ionic2RatingModule } from 'ionic2-rating';


@Component({
  selector: 'page-seller-receipt',
  templateUrl: 'seller-receipt.html'
})
export class SellerReceiptPage {

  tip : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {
    this.tip = navParams.get('tip');
  }

  submit(){
    this.viewCtrl.dismiss();
  }

}
