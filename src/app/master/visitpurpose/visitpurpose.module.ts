
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitpurposeRoutingModule } from './visitpurpose-routing.module';
import { VisitpurposeComponent } from './visitpurpose.component';
import { DataTableModule } from 'angular2-datatable';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import {HttpClientModule} from '@angular/common/http';





@NgModule({
  declarations: [VisitpurposeComponent],
  imports: [
    CommonModule,SharedModule,FormsModule,VisitpurposeRoutingModule,DataTableModule,HttpClientModule,ReactiveFormsModule
  ]
})
export class VisitpurposeModule { }
