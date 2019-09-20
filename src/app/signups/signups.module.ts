import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SignupsComponent } from './signups.component';
import { SignupsRoutingModule } from "./signups-routing.module";

import { FormsModule ,ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [SignupsComponent],
  imports: [
    CommonModule,SignupsRoutingModule,SharedModule,FormsModule,ReactiveFormsModule
  ]
})
export class SignupsModule { }
