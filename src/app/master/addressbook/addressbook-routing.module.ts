
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddressbookComponent} from './addressbook.component';
import { Routes,RouterModule } from '@angular/router';
const routes:Routes = [{
  path:'',
  component:AddressbookComponent,
  data:{
    title:'addressbook',
    icon:'icon-home', 
    caption: 'This page is describe the address',
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
export class AddressbookRoutingModule { }

