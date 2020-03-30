import { AdvancetransferComponent } from './advancetransfer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';

const routes:Routes = [{
  path:'',
  component:AdvancetransferComponent,

  }];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes) 
  ],
  exports:[RouterModule]
})
export class AdvancetransferRoutingModule { }
