import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanycreationComponent } from "./companycreation.component";
import { Routes,RouterModule } from '@angular/router';

const routes:Routes = [{
  path:'',
  component:CompanycreationComponent,
  data:{
    title:'Bank Name',
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
export class CompanycreationRoutingModule { }
