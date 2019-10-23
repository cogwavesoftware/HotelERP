
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from "@angular/router";
import { WaletComponent } from './walet.component';

const routes:Routes=[{
  path:'',
  component:WaletComponent,
  data:{
    title:'walet',
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
export class WaletRoutingModule { }
