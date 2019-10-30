import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { TaxdetailComponent } from './taxdetail.component';
const routes: Routes = [
  {
    path: '',
    component: TaxdetailComponent,
    data:{
      title:'Tax Detail',
      icon:'icon-home',
      caption: 'Tax Detail Creation Module',
      status: true
    }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxdetailRoutingModule { }
