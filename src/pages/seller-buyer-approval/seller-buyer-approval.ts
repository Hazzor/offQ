import { Component , OnInit , OnDestroy } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

import { Users } from '../../model/users.model';
import { Home } from '../home/home';
import { SellerDealDonePage } from '../seller-deal-done/seller-deal-done';


@Component({
  selector: 'page-seller-buyer-approval',
  templateUrl: 'seller-buyer-approval.html'
})

export class SellerBuyerApprovalPage implements OnInit, OnDestroy {

  audio = new Audio('audio/beep2.mp3');
  userObject : FirebaseObjectObservable<Users>;
  passUser : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af : AngularFire) {
                this.passUser =navParams.get('user');
              }

  ngOnInit() {
    console.log(this.passUser);
    this.userObject = this.af.database.object('/users/' + this.passUser.$key);
    this.audio.play();
  }

  ngOnDestroy() {
    this.audio.pause();
  }

  acceptRequest(){
    this.userObject.update({accept : true});
    this.audio.pause();
    let userData = this.passUser;
    this.navCtrl.push(SellerDealDonePage,{userData});
  }

  decline(){
    this.userObject.update({accept : "decline"}).then(() => {
      this.userObject.remove();
    });
    this.audio.pause();
    this.navCtrl.setRoot(Home);
  }

}



// loading.onDidDismiss(() => {
// this.navCtrl.push(SellerDealDonePage);
// });

// loading.present();



//   let loading = this.loadingCtrl.create({
//   // spinner: 'hide',
//   content: `
//     <div class="custom-spinner-container" mode="ios">

//       <div class="custom-spinner-box" style="width:100px;height:100px"></div>

//         <h4 >Waiting for Requester to accept</h4>
//         `,
//   duration: 2000,

// });
