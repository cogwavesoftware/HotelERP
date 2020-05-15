import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { DrivermasterRoutingModule } from './drivermaster-routing.module';
import { DrivermasterComponent } from './drivermaster.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { HttpClientModule } from '@angular/common/http';


import { ToastyModule } from 'ng2-toasty';
@NgModule({
  declarations: [DrivermasterComponent],
  imports: [
    SharedModule,
    CommonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    HttpClientModule,
    DrivermasterRoutingModule,ToastyModule.forRoot()
  ]
})
export class DrivermasterModule { }
