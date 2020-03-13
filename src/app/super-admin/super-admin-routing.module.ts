import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'SuperAdmin',
      status: false
    },
    children: [
      {
        path: 'company',
        loadChildren: () => import('./company/company.module').then(m => m.CompanyModule),
       // loadChildren: './company/company.module#CompanyModule'
      },
      {
        path: 'branch',
        //loadChildren: './branch/branch.module#BranchModule'
        loadChildren: () => import('./branch/branch.module').then(m=>m.BranchModule)
      },

      {
        path: 'tool',
       // loadChildren: './softwaresetup/softwaresetup.module#SoftwaresetupModule'
        loadChildren: () => import('./softwaresetup/softwaresetup.module').then(m=>m.SoftwaresetupModule)
      }
      // {
      //   path: 'crm-dashboard',
      //   loadChildren: './crm-dashboard/crm-dashboard.module#CrmDashboardModule'
      // },
      // {
      //   path: 'analytics',
      //   loadChildren: './analytics/analytics.module#AnalyticsModule'
      // },
      // {
      //   path: 'project',
      //   loadChildren: './project/project.module#ProjectModule'
      // }
    ]
  }
];



@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
