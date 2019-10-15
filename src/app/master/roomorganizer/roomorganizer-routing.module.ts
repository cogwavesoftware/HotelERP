import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from "@angular/router";

import { RoomorganizerComponent } from './roomorganizer.component';
const routes:Routes=[{

  path:'',
  component:RoomorganizerComponent,
  data:{
    title:'RoomNo',
    icon:'icon-home',
    caption: 'RoomNo Creation Module',
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
export class RoomorganizerRoutingModule { }
