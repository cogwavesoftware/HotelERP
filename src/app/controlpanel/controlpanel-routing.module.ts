
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Control Panel',
      status: false
    },
    children: [
      {
        path: 'usercreation',
        loadChildren: './usercreation/usercreation.module#UsercreationModule'
      },

      {
        path: 'taxrule',
        loadChildren: './taxrule/taxrule.module#TaxruleModule'
      },

      {
        path: 'financial',
        loadChildren: './financialmasters/financialmasters.module#FinancialmastersModule'
      },
     
     
    ]
  }
];



@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlpanelRoutingModule { }

