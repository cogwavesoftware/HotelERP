
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from 'src/app/shared/shared.module';
import { MasterRoutingModule } from './master-routing.module';
// import { SuperAdminRoutingModule } from './super-admin-routing.module';
// import { CompanyComponent } from './company/company.component';
// import { BranchComponent } from './branch/branch.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,MasterRoutingModule
  ]
})
export class MasterModule { }
