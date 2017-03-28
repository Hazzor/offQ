import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav, ViewController } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

import { Users } from '../../model/users.model';
import { Home } from '../home/home';
import { Ionic2RatingModule } from 'ionic2-rating';

@Component({
  selector: 'page-buyer-receipt',
  templateUrl: 'buyer-receipt.html'
})
export class BuyerReceiptPage implements OnInit {

  @ViewChild('page-buyer-receipt') nav: Nav;
  user : FirebaseObjectObservable<Users>;
  userData : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af : AngularFire, public viewCtrl : ViewController) {
    this.userData = navParams.get('userData');
  }

  ngOnInit(){
    console.log(this.userData);
    this.user = this.af.database.object('/users/'+ this.userData.$key);
  }

  submit(){
    this.user.remove();
    this.viewCtrl.dismiss();
    // this.navCtrl.setRoot(Home);
  }

}
