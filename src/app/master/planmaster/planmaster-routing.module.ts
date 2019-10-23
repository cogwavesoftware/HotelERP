import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes,RouterModule } from '@angular/router';
import { PlanmasterComponent } from './planmaster.component';

const routes:Routes = [{
  path:'',
  component:PlanmasterComponent,
  data:{
    title:'planmaster',
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
export class PlanmasterRoutingModule { }
