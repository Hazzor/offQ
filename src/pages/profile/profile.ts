import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { FirebaseObjectObservable , AngularFire } from 'angularfire2';
import { Subscription } from 'rxjs/Subscription';

import { PaymentPage } from './payment/payment';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class ProfilePage implements OnInit, OnDestroy {

  authUserSub : Subscription;
  authUser : FirebaseObjectObservable<any>;
  authUserIdSub : Subscription;
  authUserId : string;
  name : string;
  mobile : string;
  race : string;
  gender : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af : AngularFire, public alertCtrl:AlertController) {}

  ngOnInit(){
    this.authUserIdSub = this.af.auth.subscribe((currentUser) => {
      this.authUserId = currentUser.uid;
    });
    this.authUser = this.af.database.object('/authUsers/'+ this.authUserId);
    this.authUserSub = this.authUser.subscribe((userData) => {
        this.name = userData.name,
        this.mobile = userData.mobile,
        this.race = userData.race,
        this.gender = userData.gender
    });
  }

  ngOnDestroy(){
    if(this.authUserSub){
      this.authUserSub.unsubscribe();
    }
    if(this.authUserIdSub){
      this.authUserIdSub.unsubscribe();
    }
  }

   doGetPicture() {

      Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        targetHeight: 640,
      }).then((_imagePath) => {
          let ref = firebase.storage().ref('images/something.jpg');
          ref.putString(_imagePath, 'data_url').then(() => {
              console.log('Successfully uploaded a data url');
          });
      });

  }


  next(){
    if(this.name === "" || this.name === undefined || this.mobile === "" || this.mobile === undefined || this.race === "" || this.race === undefined || this.gender === "" || this.gender === undefined){
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
        this.authUser.update({name : this.name, mobile : this.mobile, race : this.race, gender : this.gender});
        let authUserId = this.authUserId;
        this.navCtrl.push(PaymentPage,{authUserId});
    }

  }

}
