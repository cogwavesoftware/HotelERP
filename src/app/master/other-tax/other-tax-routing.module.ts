import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Routes,RouterModule } from '@angular/router';
import { OtherTaxComponent } from './other-tax.component';

const routes:Routes = [{
  path:'',
  component:OtherTaxComponent,
  data:{
    title:'Create Other Tax',
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
export class OtherTaxRoutingModule { }
