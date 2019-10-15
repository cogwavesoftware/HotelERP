
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloorcreationComponent } from './floorcreation.component';
import { Routes,RouterModule } from '@angular/router';
const routes:Routes = [{
  path:'',
  component:FloorcreationComponent,
  data:{
    title:'floor',
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
export class FloorcreationRoutingModule { }

