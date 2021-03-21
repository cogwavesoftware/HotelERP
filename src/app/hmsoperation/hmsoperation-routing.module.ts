
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
        path: 'driverdetail', 
         //loadChildren: './pettycash/pettycash.module#PettycashModule'
        loadChildren: () => import('./driverdetail/driverdetail.module').then(m=>m.DriverdetailModule)
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
      }  ,
      {
        path: 'advanceposting', 
        loadChildren: () => import('./advanceposting/advanceposting.module').then(m=>m.AdvancepostingModule)
      } ,
      {
        path:'newdash',
        loadChildren:()=> import('./newdashboard/newdashboard.module').then(m=>m.NewdashboardModule)
      },

      {
        path: 'guestinfo',  
        loadChildren: () => import('./gustinfo/guestinfo.module').then(m=>m.GuestinfoModule)
      },
      {
        path: 'guestinformation',  
        loadChildren: () => import('./guestinformation/guestinformation.module').then(m=>m.GuestinformationModule)
      },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HmsoperationRoutingModule { }





