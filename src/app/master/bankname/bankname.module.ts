
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BanknameComponent }  from '../bankname/bankname.component';
import { BanknameRoutingModule  }  from './bankname-routing.module';
import { ToastyModule } from 'ng2-toasty'

@NgModule({
  declarations: [BanknameComponent],
  imports: [
    CommonModule,BanknameRoutingModule,SharedModule,FormsModule, DataTableModule,
    ToastyModule.forRoot()
  ]
})
export class BanknameModule { }
