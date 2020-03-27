import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { EditguestComponent } from './editguest.component';


const routes: Routes = [{
  path:'',
  component:EditguestComponent, 
  data:{
    title:'Blocking details',
    icon:'icon-home',
    caption: 'Blocking details ',
    status: true
  }
}];

@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditguestRoutingModule { }
