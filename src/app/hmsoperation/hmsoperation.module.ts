import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HmsoperationRoutingModule } from './hmsoperation-routing.module';
import { AdvancepostingComponent } from './advanceposting/advanceposting.component';
import { GuestinformationComponent } from './guestinformation/guestinformation.component';


@NgModule({
   declarations: [ GuestinformationComponent],
   imports: [
     CommonModule,HmsoperationRoutingModule
   ],
   providers:[],
 })
export class HmsoperationModule { }

