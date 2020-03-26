import { DiscountportalComponent } from './discountportal/discountportal.component';
import { BlockingdetailsComponent } from './blockingdetails/blockingdetails.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaindashboardRoutingModule } from './maindashboard-routing.module';
import { SharedModule } from './../../shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MaindashboardComponent} from './maindashboard.component';
import {ChartModule} from 'angular2-chartjs';
import { DatePipe } from '@angular/common';
import { TimepickerModule } from 'ngx-bootstrap/timepicker'; 
import { ToastyModule } from 'ng2-toasty'; 
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
 import { ManagementComponent } from './management/management.component';
import { HouseGuestComponent } from './house-guest/house-guest.component';
import { RoomShifftComponent } from './room-shifft/room-shifft.component';
import { AdvanceformComponent } from './advanceform/advanceform.component';
import { PostchargeComponent } from './postcharge/postcharge.component';
import { ExtrabedComponent } from './extrabed/extrabed.component';
import { ChangeguestComponent } from './changeguest/changeguest.component';
import { ChangepaxComponent } from './changepax/changepax.component';
import { AmendDateComponent } from './amend-date/amend-date.component';
import { ChangeplanComponent } from './changeplan/changeplan.component';
@NgModule({
   providers: [DatePipe],
  declarations: [MaindashboardComponent,BlockingdetailsComponent,ManagementComponent,
                 HouseGuestComponent,RoomShifftComponent,DiscountportalComponent,
                 AdvanceformComponent,PostchargeComponent,ExtrabedComponent, 
                 ChangeguestComponent, ChangepaxComponent, AmendDateComponent, ChangeplanComponent ] ,
  imports: [
    CommonModule,
    MaindashboardRoutingModule,
    CommonModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule ,
    ChartModule,
    BsDatepickerModule.forRoot(),ToastyModule.forRoot(),
    TimepickerModule.forRoot()
  ],
 // entryComponents:[BlockingdetailsComponent]
})
export class MaindashboardModule { }
