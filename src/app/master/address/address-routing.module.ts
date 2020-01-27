
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AddressComponent }  from './address.component';
import { Routes,RouterModule } from '@angular/router';
//import { GridtestComponent } from './../gridtest/gridtest.component';

const routes:Routes = [{
  path:'',
  component:AddressComponent,
  data:{
    title:'Address',
    icon:'icon-home',
    caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit',
    status: true
  }
  }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ],
  exports:[RouterModule],
  entryComponents:[]
})
export class AddressRoutingModule { }
