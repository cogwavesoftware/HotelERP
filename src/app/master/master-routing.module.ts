


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Master',
      status: false
    },
    children: [
      {
        path: 'floor',
        loadChildren: './floorcreation/floorcreation.module#FloorcreationModule'
      },
      {
        path: 'bank',
        loadChildren: './bankname/bankname.module#BanknameModule'
      },
      {
        path: 'branch',
        loadChildren: './branch/branch.module#BranchModule'
      }

     
    ]
  }
];



@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }

