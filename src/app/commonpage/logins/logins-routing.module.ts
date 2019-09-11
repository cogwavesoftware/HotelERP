

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { LoginsComponent } from '../logins/logins.component';

const routes: Routes=[

  {
    path:'',
    component:LoginsComponent,
    data:{
      title:'Loginpage'
    }
  }

];


@NgModule({
  declarations: [],
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class LoginsRoutingModule { }
