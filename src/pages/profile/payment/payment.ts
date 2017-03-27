import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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
  bank : string;
  acc : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af : AngularFire, public alertCtrl:AlertController) {
    this.authUserId = navParams.get('authUserId');
  }

  ngOnInit(){

     this.authUser = this.af.database.object('/authUsers/' + this.authUserId);
     this.authUserSub = this.authUser.subscribe((userData) => {
        this.number = userData.number,
        this.expiry = userData.expiry,
        this.cvv = userData.cvv,
        this.bank = userData.bank,
        this.acc = userData.acc
     });

  }

  ngOnDestroy(){

    if(this.authUserSub){
      this.authUserSub.unsubscribe();
    }

  }

  update(){

     if(this.number === "" || this.number === undefined || this.expiry === "" || this.expiry === undefined || this.cvv === "" || this.cvv === undefined || this.bank  === "" || this.bank  === undefined || this.acc  === "" || this.acc  === undefined){
      // console.log('Something is wrong');
      let completeFirst = this.alertCtrl.create({
      title: 'Complete everything first before proceed',
      // message: 'complete everything first before proceed',
      buttons: [

        {
          text: 'Ok',
          handler: () => {
          }
        }
      ]
    });
    completeFirst.present();
    }
    else {
      this.authUser.update({number : this.number, expiry : this.expiry, cvv : this.cvv, bank : this.bank, acc : this.acc});
      this.navCtrl.setRoot(Home);
    }

      

  }



}
