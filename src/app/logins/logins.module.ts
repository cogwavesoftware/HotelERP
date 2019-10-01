
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginsRoutingModule } from "./logins-routing.module";
import { LoginsComponent } from "./logins.component";
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule ,ReactiveFormsModule} from "@angular/forms";
import {ToastyModule} from 'ng2-toasty';
@NgModule({
  declarations: [LoginsComponent],
  imports: [
    CommonModule,
    LoginsRoutingModule,SharedModule, FormsModule,ReactiveFormsModule,
    ToastyModule.forRoot()
  ]
})
export class LoginsModule { }
