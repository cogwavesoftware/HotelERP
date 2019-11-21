
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { Routes,RouterModule } from '@angular/router';
import { AddressbookComponent } from './addressbook.component';
=======
import {AddressbookComponent} from './addressbook.component';
import { Routes,RouterModule } from '@angular/router';
>>>>>>> 0876307b5e34d9cbb467513e9938df8d41478341
const routes:Routes = [{
  path:'',
  component:AddressbookComponent,
  data:{
<<<<<<< HEAD
    title:'AddressBook',
    icon:'icon-home',
    caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit',
    status: true
  }
  }];


=======
    title:'addressbook',
    icon:'icon-home',
    caption: 'This page is describe the address',
    status: true
  }
  }];
>>>>>>> 0876307b5e34d9cbb467513e9938df8d41478341
@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class AddressbookRoutingModule { }

