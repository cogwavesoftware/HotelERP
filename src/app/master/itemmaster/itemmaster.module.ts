
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemmasterRoutingModule } from './itemmaster-routing.module';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { SharedModule } from 'src/app/shared/shared.module';
import { ItemmasterComponent } from './itemmaster.component';


@NgModule({
  declarations: [ItemmasterComponent],
  imports: [
    CommonModule,ItemmasterRoutingModule,SharedModule,DataTableModule,FormsModule
  ]
})
export class ItemmasterModule { }
