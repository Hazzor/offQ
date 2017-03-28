import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthProvider } from '../providers/auth';
import { DataProvider } from '../providers/data';

import { SignUpPage } from '../pages/auth/sign-up/sign-up';
import { ForgotPasswordPage } from '../pages/auth/forgot-password/forgot-password';
import { LoginEmailPage } from '../pages/auth/login-email/login-email';
import { initialProfilePage } from '../pages/auth/profile/profile';
import { initialPaymentPage } from '../pages/auth/profile/payment/payment';

import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { LocationPage } from '../pages/location/location';
import { ProfilePage } from '../pages/profile/profile';
import { PaymentPage } from '../pages/profile/payment/payment';
import { HelpPage } from '../pages/help/help';
import { BlockPage } from '../pages/block/block';
import { Block2Page } from '../pages/block2/block2';

import { BuyerSearchQueuePage } from '../pages/buyer-search-queue/buyer-search-queue';
import { BuyerDealDonePage } from '../pages/buyer-deal-done/buyer-deal-done';
import { BuyerReceiptPage } from '../pages/buyer-receipt/buyer-receipt';
import { EarningPage } from '../pages/earning/earning';
import { SpendingPage } from '../pages/spending/spending';

import { SellerShareOrderPage } from '../pages/seller-share-order/seller-share-order';
import { SellerBuyerApprovalPage } from '../pages/seller-buyer-approval/seller-buyer-approval';
import { SellerDealDonePage } from '../pages/seller-deal-done/seller-deal-done';
import { SellerReceiptPage } from '../pages/seller-receipt/seller-receipt';

import { Ionic2RatingModule } from 'ionic2-rating';


var config = {
    apiKey: "AIzaSyDYfd9dyJrDDe2Z8yTb8Q65ahNzTDf00M4",
    authDomain: "offqueue-f5ea1.firebaseapp.com",
    databaseURL: "https://offqueue-f5ea1.firebaseio.com",
    storageBucket: "offqueue-f5ea1.appspot.com",
    messagingSenderId: "675891166029"
  };

@NgModule({
  declarations: [
    MyApp,
    Home,
    LocationPage,
    ProfilePage,
    PaymentPage,
    HelpPage,
    BlockPage,
    Block2Page,
    BuyerSearchQueuePage,
    BuyerDealDonePage,
    BuyerReceiptPage,
    EarningPage,
    SpendingPage,
    SellerShareOrderPage,
    SellerBuyerApprovalPage,
    SellerDealDonePage,
    SellerReceiptPage,
    SignUpPage,
    LoginEmailPage,
    ForgotPasswordPage,
    initialProfilePage,
    initialPaymentPage
  ],
  imports: [
    FormsModule,
    Ionic2RatingModule ,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    MyApp,
    Home,
    LocationPage,
    ProfilePage,
    PaymentPage,
    HelpPage,
    BlockPage,
    Block2Page,
    BuyerSearchQueuePage,
    BuyerDealDonePage,
    BuyerReceiptPage,
    EarningPage,
    SpendingPage,
    SellerShareOrderPage,
    SellerBuyerApprovalPage,
    SellerDealDonePage,
    SellerReceiptPage,
    SignUpPage,
    LoginEmailPage,
    ForgotPasswordPage,
    initialProfilePage,
    initialPaymentPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},DataProvider,AuthProvider]
})
export class AppModule {}
