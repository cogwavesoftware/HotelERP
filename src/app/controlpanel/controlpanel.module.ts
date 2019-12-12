
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsercreationComponent } from './usercreation/usercreation.component';

import { ControlpanelRoutingModule } from './controlpanel-routing.module';
import { TaxruleComponent } from './taxrule/taxrule.component';

@NgModule({
  declarations: [TaxruleComponent],
  imports: [
    CommonModule,ControlpanelRoutingModule
  ]
})
export class ControlpanelModule { }
