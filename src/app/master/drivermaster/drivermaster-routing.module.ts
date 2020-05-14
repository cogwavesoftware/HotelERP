import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DrivermasterComponent } from './drivermaster.component';
import { CommonModule } from '@angular/common'; 
const routes: Routes = [
  {
  path:'',
  component:DrivermasterComponent
}
];

@NgModule({
  declarations: [],
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrivermasterRoutingModule { }
