import { Component,OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public af : AngularFire, public alertCtrl :AlertController) {
    this.authUserId = navParams.get('authUserId');
    this.payment = {
      number : "",
      expiry : "",
      cvv : "",
      bank:"",
      acc:""
    }
  }

    goHome(){
    if(this.payment.number === "" || this.payment.number === undefined || this.payment.expiry === "" || this.payment.expiry === undefined || this.payment.cvv === "" || this.payment.cvv === undefined || this.payment.bank  === "" || this.payment.bank  === undefined || this.payment.acc  === "" || this.payment.acc  === undefined){
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
          this.authUserObject.update(this.payment);
      this.navCtrl.setRoot(Home);
    }

  }

  ngOnInit(){
    this.authUserObject = this.af.database.object('/authUsers/' + this.authUserId);
  }



}
