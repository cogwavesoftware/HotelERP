import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ButtonComponent} from './button.component';

const routes: Routes = [
  {
    path: '',
    component: ButtonComponent,
    data: {
      title: 'HotelErp',
      icon: 'icon-layout-grid2-alt',
      caption: 'The best ERP app for your hotel',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ButtonRoutingModule { }
