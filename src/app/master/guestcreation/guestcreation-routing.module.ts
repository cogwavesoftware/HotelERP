import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Routes,RouterModule } from '@angular/router';
import { GuestcreationComponent } from './guestcreation.component';

const routes:Routes = [{
  path:'',
  component:GuestcreationComponent,
  // data:{
  //   title:'GuestCreation',
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
export class GuestcreationRoutingModule { }
