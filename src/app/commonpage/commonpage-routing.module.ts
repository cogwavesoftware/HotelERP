import { Title } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonpageComponent } from '../commonpage/commonpage.component';

const routes: Routes = [

  {
    path:'',
    component: CommonpageComponent,
    data:{
      title:'commonpage'
      // status:false

    }
    
   

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonpageRoutingModule { }
