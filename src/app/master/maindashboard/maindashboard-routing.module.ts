import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {MaindashboardComponent} from './maindashboard.component';
 
const routes: Routes = [{
  path:'',
  component:MaindashboardComponent ,
  data:{
    
  }
}];

@NgModule({
  declarations: [],
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaindashboardRoutingModule { }
