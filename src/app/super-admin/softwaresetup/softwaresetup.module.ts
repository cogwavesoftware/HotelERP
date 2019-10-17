import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';

import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SoftwaresetupComponent } from './softwaresetup.component';
import { SoftwaresetupRoutingModule } from './softwaresetup-routing.module';
import {UiSwitchModule} from 'ng2-ui-switch';
import {TagInputModule} from 'ngx-chips';


@NgModule({
  declarations: [SoftwaresetupComponent],
  imports: [
    CommonModule,SoftwaresetupRoutingModule,
    SharedModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    UiSwitchModule,
    TagInputModule
  ]
})
export class SoftwaresetupModule { }
