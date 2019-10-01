
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { CompanyComponent } from './company.component';


const routes:Routes=[{
path:'',
component:CompanyComponent,
data:{
  title:'Company',
  icon:'icon-home',
  caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit',
  status: true
}
}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class CompanyRoutingModule { }
