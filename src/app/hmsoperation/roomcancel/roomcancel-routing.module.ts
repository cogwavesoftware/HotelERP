
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomcancelComponent } from './roomcancel.component';
import { Routes,RouterModule } from '@angular/router';
const routes:Routes = [{
  path:'',
  component:RoomcancelComponent,

  }];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes) 
  ],
  exports:[RouterModule]
})
export class RoomcancelRoutingModule { }
