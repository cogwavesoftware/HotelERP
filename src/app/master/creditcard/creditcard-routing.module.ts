
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditcardComponent } from './creditcard.component';
import {RouterModule, Routes} from '@angular/router';

const routes:Routes = [{
  path:'',
  component:CreditcardComponent,
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
export class CreditcardRoutingModule { }
