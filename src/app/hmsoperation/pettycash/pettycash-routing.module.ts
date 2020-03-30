import { PettycashComponent } from './pettycash.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
const routes:Routes = [{
  path:'',
   component:PettycashComponent,
  }];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes) 
  ],
  exports:[RouterModule]
})
export class PettycashRoutingModule { }
