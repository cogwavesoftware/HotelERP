
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { SignupsComponent } from './signups.component';


const routes: Routes=[
  {
    path:'',
    component:SignupsComponent,
    data:{
      title:'Signuppages'
    }
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class SignupsRoutingModule { }
