import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {PrintgrcComponent} from './printgrc.component';

const routes: Routes = [{
    path:'',
    component:PrintgrcComponent,
    data:{
      title:'Print grc',
      icon:'icon-home',
      caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit',
      status: true
    }
    }
];

@NgModule({
  declarations: [],
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintgrcRoutingModule { }
