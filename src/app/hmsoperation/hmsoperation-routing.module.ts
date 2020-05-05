
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'operation',
      status: false
    },
    
    children: [
      {
        path: 'petty', 
         //loadChildren: './pettycash/pettycash.module#PettycashModule'
        loadChildren: () => import('./pettycash/pettycash.module').then(m=>m.PettycashModule)
      },

      {
        path: 'linkadvance', 
        loadChildren: () => import('./linkadvance/linkadvance.module').then(m=>m.LinkadvanceModule)
      },
      {
        path: 'transferAdvance', 
        loadChildren: () => import('./advancetransfer/advancetransfer.module').then(m=>m.AdvancetransferModule)
      },
      {
        path: 'roomcancel', 
        loadChildren: () => import('./roomcancel/roomcancel.module').then(m=>m.RoomcancelModule)
      }  
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HmsoperationRoutingModule { }





