import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetcomplimentRoutingModule } from './setcompliment-routing.module';


import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { SetcomplimentComponent } from './setcompliment.component';
  

@NgModule({
  declarations: [SetcomplimentComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    SetcomplimentRoutingModule
  ]
})
export class SetcomplimentModule { }
