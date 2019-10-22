
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingReferenceRoutingModule  } from "./booking-reference-routing.module";
import { BookingReferenceComponent } from './booking-reference.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from 'src/app/theme/forms/forms.module';

@NgModule({
  declarations: [BookingReferenceComponent],
  imports: [
    CommonModule,BookingReferenceRoutingModule,SharedModule,FormsModule
  ]
})
export class BookingReferenceModule { }
