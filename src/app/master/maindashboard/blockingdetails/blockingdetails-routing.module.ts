import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';
 import { BlockingdetailsComponent } from './blockingdetails.component';
const routes: Routes = [
  {
    path:'',
    component:BlockingdetailsComponent,
    data:{
      title:'Blocking details',
      icon:'icon-home',
      caption: 'Blocking details ',
      status: true
    }
    }];

@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlockingdetailsRoutingModule { }
