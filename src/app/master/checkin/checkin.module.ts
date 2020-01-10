
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
import {SelectModule} from 'ng-select';
import {TagInputModule} from 'ngx-chips';
import { SelectOptionService } from 'src/app/shared/elements/select-option.service';
 
@NgModule({
  declarations: [CheckinComponent, CheckoutComponent],
  providers: [SelectOptionService],
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



