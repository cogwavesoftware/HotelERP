
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { RescheckinComponent } from './rescheckin.component';

const routes:Routes = [{
  path:'',
  component:RescheckinComponent,
  }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  //exports: [RouterModule]
})
export class RescheckinRoutingModule { }

