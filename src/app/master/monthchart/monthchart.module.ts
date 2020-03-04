
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from './../../_services/loader.service';
import { LoadingComponent } from './../loading/loading.component';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { SharedModule } from './../../shared/shared.module';
import { MonthchartComponent } from './monthchart.component';
import { MonthchartRoutingModule } from './monthchart-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ToastyModule} from 'ng2-toasty';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {DatePipe}  from '@angular/common';
@NgModule({
  declarations: [MonthchartComponent,LoadingComponent],
  providers:[DatePipe],
  imports: [
    CommonModule,MonthchartRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,ToastyModule.forRoot()
  ],
  entryComponents:[LoadingComponent]
})
export class MonthchartModule { }








