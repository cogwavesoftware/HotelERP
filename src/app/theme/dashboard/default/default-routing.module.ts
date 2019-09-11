import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultComponent} from './default.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    data: {
      title: 'HotelErp',
      icon: 'icon-home',
      caption: 'The best ERP system for your hotel.',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }
