import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { DiscountportalComponent } from './discountportal.component';


const routes: Routes = [
  {
    path:'',
    component:DiscountportalComponent,
    data:{
      title:'Discount Portal details',
      icon:'icon-home',
      caption: 'Discount Portal details ',
      status: true
    }
    }];

@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscountportalRoutingModule { }
