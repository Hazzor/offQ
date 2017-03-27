import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from 'angularfire2/angularfire2';

import { BuyerSearchQueuePage } from '../buyer-search-queue/buyer-search-queue';
import { SellerShareOrderPage } from '../seller-share-order/seller-share-order';

@Component({
  selector: 'page-location',
  templateUrl: 'location.html'
})

export class LocationPage implements OnInit {

  locations: FirebaseListObservable<any>;
  posts : any;
  searchPosts: any;
  url: string;
  switch : boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public af: AngularFire) {
    this.switch = navParams.get('switch');
  }

ngOnInit(){
  this.locations =  this.af.database.list('/locations');

  Geolocation.getCurrentPosition().then((position) => {
       this.url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + position.coords.latitude + "," + position.coords.longitude + "&radius=2000&type=restaurant&key=AIzaSyDRmTX2PRRZ_YLoKDXqZGTSGLN6RsL2Gw4";
    }).then(() => {
          this.http.get(this.url).map(res => res.json()).subscribe(data => {
                this.posts = data.results;
            });
        });

}

  getItems(searchbar) {

    var search = searchbar.srcElement.value;

    if (!search) {
      this.searchPosts = false;
      return this.posts;
    }

     this.searchPosts = this.posts.filter((v) => {
      if(v.name && search) {
        if (v.name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

  }


  locationClicked(lati, longi, post){

    let key = lati + "," + longi;

      if (this.switch === true){
        this.navCtrl.push(SellerShareOrderPage,{key,post});
      }

      else if (this.switch === false){
        this.navCtrl.push(BuyerSearchQueuePage,{key,post});
      }


  }


}
