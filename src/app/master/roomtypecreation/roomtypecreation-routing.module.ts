import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from "@angular/router";
import {  RoomtypecreationComponent } from "./roomtypecreation.component";

const routes:Routes=[{
  path:'',
  component:RoomtypecreationComponent,
  data:{
    title:'RoomType',
    icon:'icon-home',
    caption: 'Room Type Creation Module',
    status: true
  }
}]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class RoomtypecreationRoutingModule { }
