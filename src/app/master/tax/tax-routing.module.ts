import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Tax',
      status: false
    },
    children: [
      {
        path: 'taxmaster',
        loadChildren: './taxmaster/taxmaster.module#TaxmasterModule'
      },
      {
        path: 'taxdetail',
        loadChildren: './taxdetail/taxdetail.module#TaxdetailModule'
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxRoutingModule { }
