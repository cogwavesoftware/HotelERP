import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import {RouterModule, Routes} from '@angular/router';
import { TaxmasterComponent } from './taxmaster.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: TaxmasterComponent,
    data:{
      title:'TaxMaster',
      icon:'icon-home',
      caption: 'TaxMaster Creation Module',
      status: true
    }
  }];


@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class TaxmasterRoutingModule { }
