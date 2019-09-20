
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginsRoutingModule } from "./logins-routing.module";
import { LoginsComponent } from "./logins.component";
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule ,ReactiveFormsModule} from "@angular/forms";
@NgModule({
  declarations: [LoginsComponent],
  imports: [
    CommonModule,
    LoginsRoutingModule,SharedModule, FormsModule,ReactiveFormsModule
  ]
})
export class LoginsModule { }
