
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginsRoutingModule } from "./logins-routing.module";
import { LoginsComponent } from "./logins.component";
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [LoginsComponent],
  imports: [
    CommonModule,
    LoginsRoutingModule,SharedModule
  ]
})
export class LoginsModule { }
