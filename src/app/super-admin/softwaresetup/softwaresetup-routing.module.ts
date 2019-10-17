import { SoftwaresetupComponent } from './softwaresetup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
const routes:Routes=[{
  path:'',
  component:SoftwaresetupComponent,
  data:{
    title:'tool',
    icon:'icon-home',
    caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit',
    status: true
  }
  }];
  

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class SoftwaresetupRoutingModule { }
