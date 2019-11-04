import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancialmasterComponent } from './financialmaster.component';
import { Routes,RouterModule } from '@angular/router';

const routes:Routes = [{
  path:'',
  component:FinancialmasterComponent,
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
export class FinancialmasterRoutingModule { }
