import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Subscription } from 'rxjs/Subscription';

import { Home } from '../../home/home';

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})

export class PaymentPage implements OnInit, OnDestroy {

  authUserSub : Subscription;
  authUser : FirebaseObjectObservable<any>;
  authUserId : string;
  number : string;
  expiry : string;
  cvv : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af : AngularFire) {
    this.authUserId = navParams.get('authUserId');
  }

  ngOnInit(){

     this.authUser = this.af.database.object('/authUsers/' + this.authUserId);
     this.authUserSub = this.authUser.subscribe((userData) => {
        this.number = userData.number,
        this.expiry = userData.expiry,
        this.cvv = userData.cvv
     });

  }

  ngOnDestroy(){

    if(this.authUserSub){
      this.authUserSub.unsubscribe();
    }

  }

  update(){

      this.authUser.update({number : this.number, expiry : this.expiry, cvv : this.cvv});
      this.navCtrl.setRoot(Home);

  }



}
