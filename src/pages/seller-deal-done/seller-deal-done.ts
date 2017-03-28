import { Component, OnInit , OnDestroy } from '@angular/core';
import { NavController, NavParams, PopoverController , AlertController, LoadingController, ModalController } from 'ionic-angular';
import { FirebaseObjectObservable , AngularFire } from 'angularfire2';
import { Subscription } from 'rxjs/Subscription';


import { Users } from '../../model/users.model';
import { Home } from '../home/home';
import { BlockPage } from '../block/block';
import { SellerReceiptPage } from '../seller-receipt/seller-receipt';

@Component({
  selector: 'page-seller-deal-done',
  templateUrl: 'seller-deal-done.html'
})

export class SellerDealDonePage implements OnInit, OnDestroy {

  audio = new Audio('audio/success.mp3');
  userSub : Subscription;
  secondSub : Subscription;
  user : FirebaseObjectObservable<Users>;
  userData : any;
  notify : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController,
              public loadingCtrl : LoadingController, public modalCtrl : ModalController, public af : AngularFire, public popoverCtrl:PopoverController) {
                this.userData = navParams.get('userData');
              }

    ngOnInit(){
      this.user = this.af.database.object('/users/'+ this.userData.$key);
      this.secondSub = this.user.subscribe((user) => {
        if(user.cancel === true){

          let confirm = this.alertCtrl.create({
            title: 'Sorry',
            message: "Requester declined your service",
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  this.navCtrl.setRoot(Home);
                }
              }
            ]
          });
          confirm.present();
        }

        else if (user.orderReceived === true){
          this.secondSub.unsubscribe();
            let tip = this.userData.tips;
            let modal = this.modalCtrl.create(SellerReceiptPage, {tip});
              modal.onDidDismiss(() => {
                this.navCtrl.setRoot(Home);
              });
            modal.present();
        }

      });

    }

    ngOnDestroy(){
      if(this.userSub){
        this.userSub.unsubscribe();
      }
      if(this.secondSub){
        this.secondSub.unsubscribe();
      }
    }

    report(myEvent){
       let popover = this.popoverCtrl.create(BlockPage);
      popover.present(
        {
  ev: myEvent
}
      );
    }

    notifyBuyer(){
      this.audio.play();
      this.notify = true;
      this.user.update({notify : true});
  }

  orderDelivered(){
      var loading = this.loadingCtrl.create({
         // spinner: 'hide',
       content: `
         <div class="custom-spinner-container" mode="ios">

           <div class="custom-spinner-box" style="width:100px;height:100px"></div>

             <h4 >Wait for Requester to verify</h4>
             `,
       cssClass:'loading'
     });

      let confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Do you confirm that you have delivered the order to the Requester?',
      buttons: [

        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
         {
          text: 'Yes',
          handler: () => {
            this.secondSub.unsubscribe();

            this.userSub = this.user.subscribe((user) => {
              if(user.orderReceived === false){ loading.present(); }

              else if (user.orderReceived === true){
                this.userSub.unsubscribe();
                loading.dismiss().then(() => {
                  let tip = this.userData.tips;
                  let modal = this.modalCtrl.create(SellerReceiptPage, {tip});
                    modal.onDidDismiss(() => {
                      this.navCtrl.setRoot(Home);
                    });
                  modal.present();
                });
              }

            });

          }
        }
      ]
    });
    confirm.present();
  }

  contact(){
          let confirm = this.alertCtrl.create({
      title: 'Contact',
      message: 'Do you want to contact ' + this.userData.buyerMobile,
      buttons: [

            {
          text: 'No',
          handler: () => {

          }
        },
                {
          text: 'Yes',
          handler: () => {

          }
        }
      ]
    });
    confirm.present();
  }

}



// close(){
//   let confirm = this.alertCtrl.create({
//     title: 'Do you want to cancel this request',
//     message: 'Cancelling request will lower your rating',
//     buttons: [
//
//           {
//         text: 'No',
//         handler: () => {
//           console.log('Disagree clicked');
//         }
//       },
//               {
//         text: 'Yes',
//         handler: () => {
//           this.viewCtrl.dismiss();
//
//         }
//       }
//     ]
//   });
//   confirm.present();
// }
