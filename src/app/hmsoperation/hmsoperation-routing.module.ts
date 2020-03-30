
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Operation',
      status: false
    },
    children: [
      {
        //path: 'floor', 
        //loadChildren: () => import('./floorcreation/floorcreation.module').then(m=>m.FloorcreationModule)
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





