import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { ReservationComponent } from './reservation.component';


const routes:Routes = [{
  path:'',
  component:ReservationComponent,
  
  }];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ]
})
export class ReservationRoutingModule { }
