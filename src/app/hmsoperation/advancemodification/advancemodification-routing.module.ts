import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvancemodificationComponent } from './advancemodification.component'; 
import { CommonModule } from '@angular/common'; 

const routes: Routes = [
  {
  path:'',
  component:AdvancemodificationComponent,
  }
];

@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvancemodificationRoutingModule { }
