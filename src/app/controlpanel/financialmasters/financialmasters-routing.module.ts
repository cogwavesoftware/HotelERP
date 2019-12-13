

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancialmastersComponent } from './financialmasters.component';
import { Routes,RouterModule } from '@angular/router';

const routes:Routes = [{
  path:'',
  component:FinancialmastersComponent,
  data:{
    title:'Financial',
    icon:'icon-home',
    caption: 'This page is describe the financial',
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
export class FinancialmastersRoutingModule { }

