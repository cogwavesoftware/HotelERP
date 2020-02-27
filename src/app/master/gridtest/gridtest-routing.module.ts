
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridtestComponent } from './gridtest.component';
import {  Routes,RouterModule } from "@angular/router";
  

const routes:Routes = [{
  path:'',
  component:GridtestComponent,
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
export class GridtestRoutingModule { }
