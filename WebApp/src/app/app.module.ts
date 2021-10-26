import { LaunchMenuComponent } from './layout/launch-menu/launch-menu.component';
import { TopMenuComponent } from './layout/top-menu/top-menu.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './layout/content/content.component';
import { LayoutContainerComponent } from './layout/layout-container/layout-container.component';
import { SplashScreenComponent } from './screens/splash-screen/splash-screen.component';
import { HomeComponent } from './screens/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { NgHttpLoaderModule } from 'ng-http-loader';
import { RefundInfoComponent } from './screens/refund-info/refund-info.component';
import { AddCreditCardComponent } from './screens/add-credit-card/add-credit-card.component';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatStepperModule} from "@angular/material/stepper";
import{MatDialogModule}from "@angular/material/dialog";

import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule, MAT_DATE_LOCALE } from "@angular/material/core";
import { PaymentDetailsComponent } from './screens/payment-details/payment-details.component';
import { WelcomeToEazyvatComponent } from './screens/welcome-to-eazyvat/welcome-to-eazyvat.component';
import { MemberConnectionDetailsComponent } from './screens/member-connection-details/member-connection-details.component';
import { AccountDetailsComponent } from './screens/account-details/account-details.component';
import { ScanPassportComponent } from './screens/scan-passport/scan-passport.component';
import { TripDetailsComponent } from './screens/trip-details/trip-details.component';
import { LinksOptionsComponent } from './screens/links-options/links-options.component';
import { EazyPassCompleteComponent } from './screens/eazy-pass-complete/eazy-pass-complete.component';
// import {
//   HTTP_INTERCEPTORS,
//   HttpClientModule,
//   HttpClient,
// } from "@angular/common/http";
import { HttpClientModule, HTTP_INTERCEPTORS , HttpClient} from '@angular/common/http';
import { TokenInterceptor } from './core/interceptors/token-interceptor.service';
import { ErrorMessageComponent } from './screens/error-message/error-message.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SuccessMessageComponent } from './screens/success-message/success-message.component';
import { PurchasesDetailsComponent } from './screens/purchases-details/purchases-details.component';
/* import { OnePurchaseNewComponent } from './screens/one-purchase-new/one-purchase-new.component'; */
import { OnePurchaseComponent } from './screens/one-purchase/one-purchase.component';
import { PurchasesSummaryComponent } from './screens/purchases-summary/purchases-summary.component';
import { PurchaseDetailsByItemComponent } from './screens/purchase-details-by-item/purchase-details-by-item.component';
import { PdfResultComponent } from './screens/pdf-result/pdf-result.component';
import { ItemDetailsComponent } from './screens/item-details/item-details.component';
import { NoVATRefundComponent } from './screens/no-vat-refund/no-vat-refund.component';
import { InfoMessageComponent } from './screens/info-message/info-message.component';
import { PaymentSummaryComponent } from './screens/payment-summary/payment-summary.component';
import { AddInvoiceComponent } from './screens/add-invoice/add-invoice.component';
import { OopsMessageComponent } from './screens/oops-message/oops-message.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NavigationComponent } from './screens/navigation/navigation.component';
import { MatButtonModule } from '@angular/material/button';
import { AgmCoreModule } from '@agm/core';
import { StoreMessageComponent } from './screens/store-message/store-message.component';
import { PassportErrorMessageComponent } from './screens/passport-error-message/passport-error-message.component';
import { MapsComponent } from './screens/maps/maps.component';
import { ShopDetailsMessageComponent } from './screens/shop-details-message/shop-details-message.component';
import { InputMaskDirective } from './input-mask.directive';

import {WebcamModule} from 'ngx-webcam';
import { EazyPassUpdateComponent } from './screens/eazy-pass-update/eazy-pass-update.component';




export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    LaunchMenuComponent,
    ContentComponent,
    LayoutContainerComponent,
    SplashScreenComponent,
    HomeComponent,
    RefundInfoComponent,
    AddCreditCardComponent,
    PaymentDetailsComponent,
    WelcomeToEazyvatComponent,
    MemberConnectionDetailsComponent,
    AccountDetailsComponent,
    ScanPassportComponent,
    TripDetailsComponent,
    LinksOptionsComponent,
    EazyPassCompleteComponent,
    ErrorMessageComponent,
    SuccessMessageComponent,
    PurchasesDetailsComponent,
    /* OnePurchaseNewComponent, */
    OnePurchaseComponent,
    PurchasesSummaryComponent,
    PurchaseDetailsByItemComponent,
    PdfResultComponent,
    ItemDetailsComponent,
    NoVATRefundComponent,
    InfoMessageComponent,
    PaymentSummaryComponent,
    AddInvoiceComponent,
    OopsMessageComponent,
    NavigationComponent,
    PassportErrorMessageComponent,
    MapsComponent,
    StoreMessageComponent,
    ShopDetailsMessageComponent,
   InputMaskDirective,
   EazyPassUpdateComponent

  ],
  imports: [
    WebcamModule,
    BrowserModule,
    NgHttpLoaderModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatButtonModule, 
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    TranslateModule.forRoot({
      defaultLanguage: "en",
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    AgmCoreModule.forRoot({
      // apiKey: 'AIzaSyAC2PPCP-9rKNlUVSqlOlmY2OMR8iHVRlY'
      // apiKey: 'AIzaSyBUbzxO-ODBKmMt2U2P-jBkQXBX-_P2-SI'
      apiKey: 'AIzaSyAXNRaWqYailuqorX_csBNZIKD0hGSxZ_A'
    })
  ],
  providers: [
    MatDatepickerModule,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
