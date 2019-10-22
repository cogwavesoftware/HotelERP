
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancialComponent } from './financial.component';
import { Routes,RouterModule } from '@angular/router';

const routes:Routes = [{
  path:'',
  component:FinancialComponent,
  data:{
    title:'Financial Master',
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
export class FinancialRoutingModule { }
