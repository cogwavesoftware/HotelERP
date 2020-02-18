import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  Routes,RouterModule } from "@angular/router";
import { ReservationlistComponent } from './reservationlist.component';
 

const routes:Routes = [{
  path:'',
  component:ReservationlistComponent,
  // data:{
  //   title:'Gridtest',
  //   icon:'icon-home',
  //   caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit',
  //   status: true
  // }
  }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes) 
  ],
  exports:[RouterModule]
})
export class ReservationlistRoutingModule { }
