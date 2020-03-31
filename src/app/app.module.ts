
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './layout/admin/admin.component';
import { AppComponent } from './app.component';

import { CamarawindowComponent } from './master/checkin/camarawindow/camarawindow.component';
import { LoadingComponent } from './master/loading/loading.component';
import { LoaderService } from './_services/loader.service';
import { AuthComponent } from './layout/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MenuItems } from './shared/menu-items/menu-items';
import { BreadcrumbsComponent } from './layout/admin/breadcrumbs/breadcrumbs.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HttpClientModule,HTTP_INTERCEPTORS,HttpClient } from '@angular/common/http';
import { NgMarqueeModule } from "ng-marquee";
import { BasicAuthInterceptor, ErrorInterceptor } from './_helpers';
import { fakeBackendProvider } from './_helpers';
import { ConfirmationDialogComponent } from './master/confirmation-dialog/confirmation-dialog.component';
import { NgbModule, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { LoaderInterceptor } from './_helpers/loader.interceptor';
import { OrderItemsComponent } from './master/order-items/order-items.component';

   // import { PrintgrcComponent } from './printgrc/printgrc.component';
//import { ConfirmationDialogService } from './_services/confirmation-dialog.service';
//import { ConfirmationDialogComponent } from './master/confirmation-dialog/confirmation-dialog.component';

// import { FloorcreationComponent } from './master/floorcreation/floorcreation.component';
// import { RoomtypecreationComponent } from './master/roomtypecreation/roomtypecreation.component';
// import { RoomorganizerComponent } from './master/roomorganizer/roomorganizer.component';
// import { GuestcreationComponent } from './master/guestcreation/guestcreation.component';
// import { CompanycreationComponent } from './master/companycreation/companycreation.component';
// import { PlancreationComponent } from './master/plancreation/plancreation.component';
// import { CreditcardComponent } from './master/creditcard/creditcard.component';
// import { BanknameComponent } from './master/bankname/bankname.component';

// // import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [   
    AppComponent, 
    AuthComponent,
    AdminComponent,
    BreadcrumbsComponent, 
    ConfirmationDialogComponent ,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps: [HttpClient]
    //   }
    // })
   
  ],
  entryComponents:[ConfirmationDialogComponent],
  providers: [
    
      MenuItems,
      {
        provide: NgbDateAdapter,
        useClass: NgbDateNativeAdapter
      },
      { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }

    //{ provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
   // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    //fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
