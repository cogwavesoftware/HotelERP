import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {UserrightsComponent }  from '../userrights/userrights.component';
import { UserrightsRoutingModule  }  from './userrights-routing.module';


@NgModule({
  declarations: [UserrightsComponent],
  imports: [
    CommonModule,UserrightsRoutingModule,SharedModule,DataTableModule,FormsModule, ReactiveFormsModule,HttpClientModule
  ]
})
export class UserrightsModule { }
