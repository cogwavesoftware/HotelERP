import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancialmasterComponent } from './financialmaster.component';
import { Routes,RouterModule } from '@angular/router';

const routes:Routes = [{
  path:'',
  component:FinancialmasterComponent,
  data:{
    title:'Financiual Name',
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
export class FinancialmasterRoutingModule { }
