import { SharedModule } from 'src/app/shared/shared.module';
import { NewdashboardRoutingModule } from './newdashboard-routing.module';
import { NewdashboardComponent } from './newdashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [NewdashboardComponent],
  
  imports: [
    CommonModule,NewdashboardRoutingModule,SharedModule
  ]
})
export class NewdashboardModule { }

