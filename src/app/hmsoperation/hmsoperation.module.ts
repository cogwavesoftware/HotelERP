
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HmsoperationRoutingModule } from './hmsoperation-routing.module';
import { PettycashComponent } from './pettycash/pettycash.component';
import { RoomcancelComponent } from './roomcancel/roomcancel.component';
import { LinkReservationAdvanceComponent } from './link-reservation-advance/link-reservation-advance.component';
import { AdvancetransferComponent } from './advancetransfer/advancetransfer.component';



@NgModule({
  declarations: [PettycashComponent, RoomcancelComponent, LinkReservationAdvanceComponent, AdvancetransferComponent],
  imports: [
    CommonModule,HmsoperationRoutingModule
  ],
  providers:[],
})
export class HmsoperationModule { }






