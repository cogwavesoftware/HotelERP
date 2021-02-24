import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestinformationComponent } from './guestinformation.component';
import { CommonModule } from '@angular/common'; 
const routes: Routes = [
  {
     path:'',
     component:GuestinformationComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestinformationRoutingModule { }
