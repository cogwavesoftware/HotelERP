
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CheckinRoutingModule } from './checkin-routing.module';
import { CheckinComponent } from './checkin.component';
import { ToastyModule } from 'ng2-toasty';
import { PlancreationRoutingModule } from './../plancreation/plancreation-routing.module';
import { PlancreationComponent } from './../plancreation/plancreation.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutRoutingModule } from './checkout/checkout-routing.module';


@NgModule({
  declarations: [CheckinComponent, CheckoutComponent],
  imports: [
    CommonModule,CheckinRoutingModule,CheckoutRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    
    ReactiveFormsModule,ToastyModule.forRoot()
  ]
})
export class CheckinModule { }



