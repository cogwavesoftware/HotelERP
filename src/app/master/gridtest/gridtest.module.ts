
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import { DataTableModule } from 'angular2-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastyModule } from 'ng2-toasty';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { DatePipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { GridtestRoutingModule } from './gridtest-routing.module';
import { GridtestComponent } from './gridtest.component';
import { CamarawindowComponent } from '../checkin/camarawindow/camarawindow.component';
import { MatDialogModule } from '@angular/material/dialog';
import { OrderItemsComponent } from './../order-items/order-items.component';
// import { PettycashComponent } from './pettycash/pettycash.component';

@NgModule({
  declarations: [GridtestComponent, CamarawindowComponent ],
   
  providers: [DatePipe, ConfirmationDialogService],
  imports: [
    CommonModule, GridtestRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    NgSelectModule,
    MatDialogModule,
    BsDatepickerModule.forRoot(), TimepickerModule.forRoot(),
    ReactiveFormsModule, ToastyModule.forRoot()
  ],
  entryComponents: [CamarawindowComponent]

})
export class GridtestModule { }




