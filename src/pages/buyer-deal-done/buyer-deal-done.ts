import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, ViewController } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Subscription } from 'rxjs/Subscription';

import { Users } from '../../model/users.model';
import { Home } from '../home/home';
import { BuyerReceiptPage } from '../buyer-receipt/buyer-receipt';

@Component({
  selector: 'page-buyer-deal-done',
  templateUrl: 'buyer-deal-done.html'
})

export class BuyerDealDonePage implements OnInit, OnDestroy {

  audio = new Audio('audio/success.mp3');
  audio2 = new Audio('audio/orderDone.mp3');

  userSub : Subscription;
  userObject : FirebaseObjectObservable<Users>;
  passUser : any;
  notify : boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl:ModalController, public alertCtrl:AlertController,
              public viewCtrl:ViewController, public af : AngularFire){
                this.passUser = navParams.get('connectedUser');
              }

  ngOnInit(){
    this.audio.play();
    this.userObject = this.af.database.object('/users/'+ this.passUser.$key);
    this.userSub = this.userObject.subscribe((user) => {
      this.audio2.play();
      this.notify = user.notify;
      
    });
  }

  ngOnDestroy(){
    if(this.userSub){
      this.userSub.unsubscribe();
    }
  }

  orderReceived(){
      let confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Do you confirm that you have received the order from your Queuer?',
      buttons: [

          {
          text: 'No',
          handler: () => {
            console.log('No Clicked');
          }
        },
          {
          text: 'Yes',
          handler: () => {
            this.userObject.update({orderReceived : true});
            let userData = this.passUser;
            // this.navCtrl.push(BuyerReceiptPage,{userData});
            let modal = this.modalCtrl.create(BuyerReceiptPage, {userData});
            modal.present();
            modal.onDidDismiss(() => {
              this.navCtrl.setRoot(Home);
            })
          }
        }

      ]
    });
    confirm.present();
  }

  contact(){
      let confirm = this.alertCtrl.create({
      title: 'Contact',
      message: 'Do you want to contact ' + this.passUser.queuerMobile,
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
            console.log('Yes clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  close(){

      let confirm = this.alertCtrl.create({
      title: 'Do you want to cancel order',
      message: 'Cancelling order will lower your rating',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.userObject.update({
              cancel : true
            }).then(() => {
              this.userObject.remove();
            });
            this.navCtrl.setRoot(Home);
          }
        }
      ]
    });
    confirm.present();

  }

  openOrder(){

      let confirm = this.alertCtrl.create({
      title: 'Your Order',
      message: this.passUser.request,
      buttons: [
        {
          text: 'OK',
          handler: () => {

          }
        }
      ]
    });
    confirm.present();

  }

}
