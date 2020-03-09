import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import { CommonModule } from '@angular/common';
import { RoomadvanceComponent } from './roomadvance.component';
 

const routes: Routes = [{
  path:'',
  component:RoomadvanceComponent,
  data:{
    title:'Roomadvance',
    icon:'icon-home',
    caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit',
    status: true
  } 
  }]; 
@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomadvanceRoutingModule { }


