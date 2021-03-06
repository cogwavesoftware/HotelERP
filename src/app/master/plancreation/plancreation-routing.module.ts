import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { PlancreationComponent } from './plancreation.component';

const routes:Routes = [{
  path:'',
  component:PlancreationComponent,
  data:{
    title:'Credit Card',
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
export class PlancreationRoutingModule { }
