import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AngularFire , FirebaseListObservable , FirebaseObjectObservable } from 'angularfire2';
import { Subscription } from 'rxjs/Subscription';

import { Users } from '../../model/users.model';
import { Home } from '../home/home';
import { BuyerDealDonePage } from '../buyer-deal-done/buyer-deal-done';

@Component({
  selector: 'page-buyer-search-queue',
  templateUrl: 'buyer-search-queue.html'
})

export class BuyerSearchQueuePage implements OnInit,OnDestroy {

  userSub : Subscription;
  secondSub : Subscription;
  user : any;
  connectedUser : FirebaseObjectObservable<Users>;

  authKeySub : Subscription;
  authUserSub : Subscription;
  authKey : string;
  authUser : any;

  name : string;
  display : string;
  request : string;
  tips : string;
  showDescription : boolean;

  loading : any;
  loading2 : any;

  constructor(public navCtrl : NavController, public navParams : NavParams, public loadingCtrl : LoadingController,
              public alertCtrl : AlertController, public af : AngularFire) {}

    ngOnInit(){
      this.name = this.navParams.get('post');
      let locationKey = this.navParams.get('key');
      this.user = this.af.database.list('/users', {
        query : {
          orderByChild : "location",
          equalTo : locationKey,
        }
      }).map((locationUser) => {
        return locationUser.filter((connectedUser) => {
          return connectedUser.connected === false;
        });
      });

      this.authKeySub = this.af.auth.subscribe((currentUser) => {
        this.authKey = currentUser.uid;
      });
      this.authUserSub = this.af.database.object('/authUsers/'+ this.authKey).subscribe((authUser) => {
        this.authUser = authUser;
      });

    }

    ngOnDestroy(){
      this.loading.dismiss();
      this.loading2.dismiss();

      if(this.userSub){
        this.userSub.unsubscribe();
      }
      if(this.secondSub){
        this.secondSub.unsubscribe();
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
          this.display = "I am "+ this.authUser.race + " " + this.authUser.gender + " that wear " + color + " outfit today";
        }
    }

  searchQueue(){

    if ((this.tips === undefined || this.tips === "") || (this.request === undefined || this.request === "") || (this.display === undefined || this.display === "")){

      let somethingWrong = this.alertCtrl.create({
      title: 'Please fill in everything',
      // message: 'complete everything first before proceed',
      buttons: [

        {
          text: 'Ok',
          handler: () => {
          }
        }
      ]
    });
      somethingWrong.present();
    }

    else {

       this.loading = this.loadingCtrl.create({
          // spinner: 'hide',
        content: `
          <div class="custom-spinner-container" mode="ios">

            <div class="custom-spinner-box" style="width:100px;height:100px"></div>

              <h4 >Searching for a Queuer</h4>
              `,
        duration : 25000,
        cssClass:'loading'
      });


      this.userSub = this.user.subscribe((user) => {

          if(user[0] === undefined){
              this.loading.present();
          }

          else {
              this.userSub.unsubscribe();
              this.loading.dismiss().then(() => {
                this.anotherLoading(user);
              });
          }

      });
    }
  }

    anotherLoading(user){
      this.connectedUser = this.af.database.object('/users/' + user[0].$key);
        this.loading2 = this.loadingCtrl.create({
          // spinner: 'hide',
          content: `
            <div class="custom-spinner-container" mode="ios">

            <div class="custom-spinner-box" style="width:100px;height:100px"></div>

            <h4> Wait for response from queuer!</h4>
          `,
          cssClass:'loading'
      });

      this.secondSub = this.connectedUser.subscribe((connectedUser) => {
        if (connectedUser.accept === false){
          this.authKeySub.unsubscribe();
          this.authUserSub.unsubscribe();
          this.connectedUser.update({
            buyer : this.display,
            buyerMobile : this.authUser.mobile,
            buyerId : this.authUser.name,
            tips : this.tips,
            request : this.request,
            connected : true
          });
            this.loading2.present();
          }

        else if (connectedUser.accept === "decline"){
          this.secondSub.unsubscribe();
            this.loading2.dismiss().then(() => {
              let confirm = this.alertCtrl.create({
                title: 'Sorry',
                message: "Queuer declined your request",
                buttons: [
                  {
                    text: 'OK',
                    handler: () => {

                    }
                  }
                ]
              });

              confirm.present();
            });
          }

        else if (connectedUser.accept === true) {
            this.secondSub.unsubscribe();
              this.loading2.dismiss().then(() => {
                this.navCtrl.push(BuyerDealDonePage, {connectedUser});
              });
        }

      });

    }


}
  //   loading.onDidDismiss(() => {
  //      // this.waitToBeAcceptedByQueuer();
  //      let modal = this.modalCtrl.create(BuyerDealDonePage,this.user);
  //      modal.present();
  //    // this.navCtrl.push(BuyerDealDonePage);
  //  });
  // loading.onDidDismiss(() => {
  //   let modal = this.modalCtrl.create(BuyerSellerApprovalPage);
  //   modal.present();
  // });
  //
  // loading.present();
  // }


  // changePayment(){
  //   let alert = this.alertCtrl.create();
  //   alert.setTitle('Choose Payment options');
  //
  //   alert.addInput({
  //     type: 'radio',
  //     label: 'Cash',
  //     value: 'Cash',
  //     checked: true
  //   });
  //
  //   alert.addInput({
  //     type: 'radio',
  //     label: 'VISA',
  //     value: 'VISA',
  //     checked: false
  //   });
  //
  //   alert.addButton('Cancel');
  //   alert.addButton({
  //     text: 'OK',
  //     handler: data => {
  //       // this.testRadioOpen = false;
  //       this.testRadioResult = data;
  //     }
  //   });
  //   alert.present();
  //
  // }
