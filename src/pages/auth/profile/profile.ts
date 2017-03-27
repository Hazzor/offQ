import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseObjectObservable, AngularFire } from 'angularfire2';
import { Subscription } from 'rxjs/Subscription';

import { initialPaymentPage } from './payment/payment';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class initialProfilePage implements OnInit {

  authUser : FirebaseObjectObservable<any>;
  authUserIdSub : Subscription;
  authUserId : string;
  name : string;
  mobile : string;
  race : string;
  gender : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af : AngularFire) {}

  ngOnInit(){
    this.authUserIdSub = this.af.auth.subscribe((currentUser) => {
      this.authUserId = currentUser.uid;
    });
    this.authUser = this.af.database.object('/authUsers/'+this.authUserId);
  }

  ngOnDestroy(){
    if(this.authUserIdSub){
      this.authUserIdSub.unsubscribe();
    }
  }

  next(){
    if(this.name === "" || this.name === undefined || this.mobile === "" || this.mobile === undefined || this.race === "" || this.race === undefined || this.gender === "" || this.gender === undefined){
      console.log('Something is wrong');
    }
    else {
      this.authUser.update({name : this.name, mobile : this.mobile, race : this.race, gender : this.gender});
      let authUserId = this.authUserId
      this.navCtrl.push(initialPaymentPage,{authUserId});
    }

  }

}
