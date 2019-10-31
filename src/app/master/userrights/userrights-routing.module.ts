import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserrightsComponent} from './userrights.component';
import { Routes,RouterModule } from '@angular/router';
import { Component } from 'ag-grid-community';
 
const routes:Routes = [{
  path:'',
  component:UserrightsComponent,
  data:{
    title:'Uerrights',
    icon:'icon-home',
    caption: 'Sets rights for Users',
    status: true
  }
  }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class UserrightsRoutingModule { }
