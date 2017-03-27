import { Component , OnInit , OnDestroy } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFire , FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Subscription } from 'rxjs/Subscription';

import { Users } from '../../model/users.model';
import { SellerBuyerApprovalPage } from '../seller-buyer-approval/seller-buyer-approval';


@Component({
  selector: 'page-seller-share-order',
  templateUrl: 'seller-share-order.html'
})

export class SellerShareOrderPage implements OnInit, OnDestroy {

 userSub : Subscription;
 users : FirebaseListObservable<Users[]>;
 authUserSub : Subscription;
 authUser : any;
 authKeySub : Subscription;
 authKey : string;
 locationKey : string;
 key : string;
 name : string;
 display : string;
 showDescription : boolean;
 online : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl : AlertController,
                public af : AngularFire) {
                  this.locationKey = navParams.get('key');
                }

  ngOnInit(){
    this.name = this.navParams.get('post');
    this.authKeySub = this.af.auth.subscribe((currentUser) => {
      this.authKey = currentUser.uid;
    });
    this.users = this.af.database.list('/users');
    this.authUserSub = this.af.database.object('/authUsers/' + this.authKey).subscribe((authUser) => {
        this.authUser = authUser;
    });
  }

  ngOnDestroy(){
    if(this.userSub){
      this.userSub.unsubscribe();
    }
    if(this.authKeySub){
      this.authKeySub.unsubscribe();
    }
    if(this.authUserSub){
      this.authUserSub.unsubscribe();
    }
  }

  colorClicked(color){
    if (color === undefined){
      this.showDescription = false;
    }
    else {
      this.showDescription = true;
      this.display = "I am a " + this.authUser.race + " " + this.authUser.gender + " that wear "+ color + " outfit today";
    }
  }

  shareQueue(){
    if (this.showDescription === true){
      this.online = true;
      this.users.push({queuer : this.display, queuerMobile : this.authUser.mobile, queuerId : this.authUser.name, location : this.locationKey, connected : false, notify : false, accept : false, orderReceived : false, cancel : false})
                    .then((item) => {
                        this.key  = item.key
                        this.userSub = this.af.database.object('/users/' + this.key)
                            .subscribe((user) => {
                                if(user.connected === true){
                                  this.authUserSub.unsubscribe();
                                  this.authKeySub.unsubscribe();
                                  this.userSub.unsubscribe();
                                  this.navCtrl.push(SellerBuyerApprovalPage,{user});
                                }
                              });
                      });
    }

    else {

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
      // let loading = this.loadingCtrl.create({
      //     content: `
      //       <div class="custom-spinner-container" mode="ios">
      //
      //         <div class="custom-spinner-box" style="width:100px;height:100px"></div>
      //
      //           <h4 >Searching for Requester</h4>
      //           `,
      //     duration: 2000,
      //   });

    // loading.onDidDismiss(() => {
    //   let modal = this.modalCtrl.create(SellerBuyerApprovalPage);
    //   modal.present();
    // });
    // loading.present();

  }

  Offline(){
    this.online = false;
    this.users.remove(this.key);
  }

}
