
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

import {TagInputModule} from 'ngx-chips';
import { SelectOptionService } from 'src/app/shared/elements/select-option.service';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// import {SelectModule} from 'ng-select';
import {DatePipe} from '@angular/common';
@NgModule({
  declarations: [CheckinComponent, CheckoutComponent],
  providers: [SelectOptionService,DatePipe],
  imports: [
    CommonModule,CheckinRoutingModule,CheckoutRoutingModule,
    SharedModule,
     HttpClientModule,
     DataTableModule,
     FormsModule,
     //SelectModule,
     BsDatepickerModule.forRoot(),TimepickerModule.forRoot(),
    ReactiveFormsModule,ToastyModule.forRoot()
  ]
})
export class CheckinModule { }



