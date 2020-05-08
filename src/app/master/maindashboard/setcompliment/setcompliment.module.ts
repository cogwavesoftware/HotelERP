import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { SetcomplimentRoutingModule } from './setcompliment-routing.module';
 import { HttpClientModule } from '@angular/common/http'; 
import { SetcomplimentComponent } from './setcompliment.component';


import {DataTableModule} from 'angular2-datatable';

  
import { SharedModule } from 'src/app/shared/shared.module'; 

@NgModule({
  declarations: [SetcomplimentComponent] ,
  
    
  imports:      [ BrowserModule, FormsModule ,
     SharedModule,
     HttpClientModule,
     DataTableModule,
     FormsModule, 
     ReactiveFormsModule
  ]
})
export class SetcomplimentModule { }
