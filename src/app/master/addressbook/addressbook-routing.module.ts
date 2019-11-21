
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { AddressbookComponent } from './addressbook.component';
const routes:Routes = [{
  path:'',
  component:AddressbookComponent,
  data:{
    title:'AddressBook',
    icon:'icon-home',
    caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit',
    status: true
  }
  }];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class AddressbookRoutingModule { }

