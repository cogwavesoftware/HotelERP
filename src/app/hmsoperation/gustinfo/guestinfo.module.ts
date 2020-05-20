import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { GustinfoComponent } from './gustinfo.component';
import { GuestinfoRoutingModule } from './guestinfo-routing.module'; 
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { DataTableModule } from 'angular2-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastyModule } from 'ng2-toasty'; 
@NgModule({
  declarations: [ GustinfoComponent],
  imports: [
    CommonModule,
    GuestinfoRoutingModule,
    SharedModule,
     HttpClientModule,
     DataTableModule,
     FormsModule,
     NgSelectModule ,
     ReactiveFormsModule,ToastyModule.forRoot()
  ]
})
export class GuestinfoModule { }
