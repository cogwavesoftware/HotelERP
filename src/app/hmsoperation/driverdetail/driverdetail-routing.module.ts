import { NgModule } from '@angular/core';  
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { DriverdetailComponent } from './driverdetail.component';
const routes: Routes = [
  {
    path:'',
     component:DriverdetailComponent,
    }
];

@NgModule({
  declarations: [],
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverdetailRoutingModule { }
