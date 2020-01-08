<<<<<<< HEAD
=======
import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

 
@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss'],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class CheckinComponent implements OnInit {
  model:any = {};
  public navRight: string;
  gendercategory : string [] =  ['Mr','Miss1', 'Mrs'];
  gendercatagerys : string[] =  ['Male', 'Female'];
  paymentmode:string[] = ['Online', 'Credit Card','Cash'];
  public data: string[] = ['1', '2', '3', '4', '5', '6'];
  bookingtypes:string[] = ['OT',"Traval"];
  foriegnguest:string[] = ['Guest1','Guest2'];
  Cities:string[] = ['TN','KA'];

  genderitems:any;
  gender:any;
  pincode:any;

  constructor() { 
    this.navRight = 'nav-off';
  }

  ngOnInit() {

    this.model = {
        roomno:1000,
        name:null,
        gender:null,
        address:null,
        pincode:null,
        state:null,
        company:null,
        gstno:null,
        mobile:null,
        email:null,
        ARFrom:null,
        proceeding:null,
        purvisit:null,
        DOB:null,
        IsActive:null,
        nofdays:null,
        checkindate:null,
        checkoutdate:null
    };
  }
  opencompanydetails(event){      
    setTimeout(()=>{
      console.log("compamny calling");  
    },1000);
    document.querySelector("#" + event).classList.add("md-show");
  }
  openproceedingdetails(event){      
    setTimeout(()=>{
      console.log("openprocedingdetails calling");  
    },1000);
    document.querySelector("#" + event).classList.add("md-show");
  }
  openARdetails(event){      
    setTimeout(()=>{
      console.log("openARdetails calling");  
    },1000);
    document.querySelector("#" + event).classList.add("md-show");
  }
  
}
>>>>>>> 5bd1592b15cb10b38f2eb5603891c810be0ab072
