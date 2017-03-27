import { Component,OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

import { Home } from '../../../home/home';


@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class initialPaymentPage implements OnInit {

  authUserId : string;
  authUserObject : FirebaseObjectObservable<any>;
  payment : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af : AngularFire) {
    this.authUserId = navParams.get('authUserId');
    this.payment = {
      number : "",
      expiry : "",
      cvv : ""
    }
  }

  ngOnInit(){
    this.authUserObject = this.af.database.object('/authUsers/' + this.authUserId);
  }

  goHome(){
    this.authUserObject.update(this.payment);
    this.navCtrl.setRoot(Home);
  }


}
