
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './layout/admin/admin.component';
import { AppComponent } from './app.component';


import { AuthComponent } from './layout/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MenuItems } from './shared/menu-items/menu-items';
import { BreadcrumbsComponent } from './layout/admin/breadcrumbs/breadcrumbs.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { bookingsComponent } from './bookings/bookings.component';
import { bookingService } from './shared/booking.service';
import { bookingComponent } from './bookings/booking/booking.component';

import { NgMarqueeModule } from "ng-marquee";
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';

import { BasicAuthInterceptor, ErrorInterceptor } from './_helpers';


import { fakeBackendProvider } from './_helpers';
@NgModule({
  declarations: [   
    AppComponent, 
    AuthComponent,
    AdminComponent,
    BreadcrumbsComponent,
    //bookingsComponent,
    //bookingComponent, 
    //CommonpageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ToastrModule.forRoot(),
    NgMarqueeModule,
    
    
  ],
  //entryComponents: [CommonpageComponent],
  providers: [
    MenuItems, bookingService,
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
fakeBackendProvider
  
  ],

  
  bootstrap: [AppComponent]
})
export class AppModule { }
