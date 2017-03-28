import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

/*
  Generated class for the Block page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-block',
  template: ` <ion-list>
     <ion-item (click)="itemClicked()">
        <ion-label>Report</ion-label>
        
      </ion-item>

    </ion-list>
    `
})
export class Block2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlockPage');
  }

  itemClicked(){
     let alert = this.alertCtrl.create();
    alert.setTitle('Report this Queuer');

    alert.addInput({
      type: 'radio',
      label: 'Queuer did not buy the requested food',
      value: 'runaway',
      
    });

    alert.addInput({
      type: 'radio',
      label: 'Queuer does fake queue',
      value: 'notshowup',
      
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Report',
      handler:() => {}
    });
    alert.present();


  }

}
