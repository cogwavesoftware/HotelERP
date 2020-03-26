import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { EditguestRoutingModule } from './editguest-routing.module';
import { EditguestComponent } from './editguest.component';
import {DatePipe} from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [EditguestComponent ],
  providers: [DatePipe],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    EditguestRoutingModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),TimepickerModule.forRoot(),
    ReactiveFormsModule
  ]
})
export class EditguestModule { }
