import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {MaindashboardComponent} from './maindashboard.component';
 

import {SharedModule} from '../../shared/shared.module';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [{
  path:'',
  component:MaindashboardComponent ,
  data:{
    
  }
}];

@NgModule({
  declarations: [],
  imports: [CommonModule,SharedModule,NgSelectModule,HttpClientModule,
    DataTableModule,FormsModule,ReactiveFormsModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaindashboardRoutingModule { }
