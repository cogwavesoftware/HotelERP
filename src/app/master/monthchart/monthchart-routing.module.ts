
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthchartComponent } from './monthchart.component';
import { Routes,RouterModule } from '@angular/router';
const routes:Routes = [{
  path:'',
  component:MonthchartComponent,
  data:{
    title:'Ledger Creation',
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
export class MonthchartRoutingModule { }




