
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
        //loadChildren: './usercreation/usercreation.module#UsercreationModule'
        loadChildren: () => import('./usercreation/usercreation.module').then(m=>m.UsercreationModule)
      },

      {
        path: 'taxrule',
       // loadChildren: './taxrule/taxrule.module#TaxruleModule'
        loadChildren: () => import('./taxrule/taxrule.module').then(m=>m.TaxruleModule)
      },

      {
        path: 'financial',
        //loadChildren: './financialmasters/financialmasters.module#FinancialmastersModule'
        loadChildren: () => import('./financialmasters/financialmasters.module').then(m=>m.FinancialmastersModule)
      },
     
      {
        path:'userrights',
       // loadChildren: './userrights/userrights.module#UserrightsModule'
        loadChildren: () => import('./userrights/userrights.module').then(m=>m.UserrightsModule)
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

