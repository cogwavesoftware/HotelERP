
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CreditcardComponent } from './creditcard.component';
import { CreditcardRoutingModule } from './creditcard-routing.module';
import { ToastyModule } from 'ng2-toasty';



@NgModule({
  declarations: [CreditcardComponent],
  imports: [
    CommonModule,CreditcardRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,ToastyModule.forRoot()
  ]
})
export class CreditcardModule { }

