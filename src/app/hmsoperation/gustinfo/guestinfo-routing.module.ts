import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { GustinfoComponent } from './gustinfo.component';

const routes: Routes = [
  {
    path:'',
     component:GustinfoComponent ,
    }
];
@NgModule({
  declarations: [],
  imports: [CommonModule,RouterModule.forChild(routes) ],
  exports: [RouterModule]
})
export class GuestinfoRoutingModule { }
