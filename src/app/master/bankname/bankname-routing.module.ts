

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BanknameComponent } from './bankname.component';

import { Routes,RouterModule } from '@angular/router';

const routes:Routes = [{
  path:'',
  component:BanknameComponent,
  data:{
    title:'BankName',
    icon:'icon-home',
    caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit',
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
export class BanknameRoutingModule { }

