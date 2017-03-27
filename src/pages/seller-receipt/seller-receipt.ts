import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { Home } from '../home/home';

@Component({
  selector: 'page-seller-receipt',
  templateUrl: 'seller-receipt.html'
})
export class SellerReceiptPage {

  tip : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {
    this.tip = navParams.get('tip');
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
