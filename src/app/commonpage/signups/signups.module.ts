import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SignupsComponent } from './signups.component';
import { SignupsRoutingModule } from "./signups-routing.module";




@NgModule({
  declarations: [SignupsComponent],
  imports: [
    CommonModule,SignupsRoutingModule,SharedModule
  ]
})
export class SignupsModule { }
