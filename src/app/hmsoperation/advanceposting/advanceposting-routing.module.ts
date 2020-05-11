
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { AdvancepostingComponent } from './advanceposting.component';
const routes: Routes = [
  {
  path:'',
  component:AdvancepostingComponent,
  }
];

@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvancepostingRoutingModule { }

