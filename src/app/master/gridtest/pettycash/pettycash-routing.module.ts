import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { Routes, RouterModule } from '@angular/router';
import { PettycashComponent } from './pettycash.component';


const routes: Routes = [{
  path:'',
  component:PettycashComponent,
  // data:{
  //   title:'Gridtest',
  //   icon:'icon-home',
  //   caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit',
  //   status: true
  // }
  }];

@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PettycashRoutingModule { }
