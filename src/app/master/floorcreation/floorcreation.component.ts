
import { Component, OnInit,Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Floormodel } from './../../_models/floormodel';
 import {  Observable } from "rxjs";
 
import { FloormasterService } from './../../_services/floormaster.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-floorcreation',
  templateUrl: './floorcreation.component.html',
  styleUrls: ['./floorcreation.component.scss']
})
export class FloorcreationComponent implements OnInit {
 

  public data: Observable<Floormodel>;
  
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';

  @Input('modalDefault') modalDefault: any;  
  isValid:boolean;
  public isShown:boolean = false;
   dtat:string;
  title: string;
  msg: string;
  returnUrl:string;
  showClose = true;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;
  btitle:string="Add Floor";
   model: any = {};
  
  constructor( public _floorservice: FloormasterService,private datePipe:DatePipe ) { }

  ngOnInit() 
  {
    var ddMMyyyy = this.datePipe.transform(new Date(),"dd-MM-yyyy");
    console.log(ddMMyyyy); //output - 14-02-2019

    var MMddyyyy = this.datePipe.transform(new Date(),"MM-dd-yyyy");
    console.log(MMddyyyy); //output - 14-02-2019

    var short = this.datePipe.transform(new Date(),"M/d/yy");
    console.log(short); //output - 2/14/19

    var medium = this.datePipe.transform(new Date(),"MMM d, y, h:mm:ss a");
    console.log(medium); //output - Feb 14, 2019, 3:45:06 PM


    this.btitle="Add Item"
   this.data = this._floorservice.GetfloorData()
    console.log(this.data);
  }

  onSubmit()
  {
   console.log(this.model)
  }

   Showhide() 
   {  
     this.resetForm();
    if (this.btitle=="Hide Form")
    {
      this.isShown = false;
      this.btitle="Add Item"    
    }
    else
    {
      this.resetForm();
      this.isShown = true; 
      this.btitle="Hide Form"
    }   
  }

  Closeform(){
      this.isShown = false;
      this.btitle="Add Item"  
      this.resetForm(); }
      
  resetForm(form?: NgForm)
  {

     this.model = {
      RNo: null,
      FloorCode: '',
      FloorName: '',
      MaxRoom: null,
      Alloted :null,
      Unalloted : null,
      IsActive :null,
      BranchCode : '',
      CreatedBy :null, 
      CreatedDate : null, 
      ModifyBy : null, 
      ModifyedDate : null, 
      IpAddress : null,
    };
    
  }

  openMyModalData(event) {

    this.btitle="Hide Form"
     
    this.isShown = true;
    this.data.subscribe(response => {
      this.model.FloorName=response[event]['FloorName'];
      this.model.FloorCode=response[event]['FloorCode'];
      this.model.MaxRoom=response[event]['MaxRoom'];
      this.model.IsActive=response[event]['IsActive'];
    });
    
    //this.model = {  
    //   FloorCode:data.FloorCode,
    //   FloorName:data.FloorName,
    //   MaxRoom: data.MaxRoom,
    //   Alloted :data.Alloted,
    //   Unalloted : data.Unalloted,
    //   IsActive :data.IsActive,
    //   BranchCode : data.BranchCode,  
    // };
   
    // this.data.subscribe(response => {
    //     this.model = response[event]['name'];
    //     this.userID = response[event]['id'];
    //     this.userProPic = response[event]['image'];
    //     this.userEmail = response[event]['email'];
    //     this.userPosition = response[event]['position'];
    //     this.userOffice = response[event]['office'];
    //     this.userAge = response[event]['age'];
    //     this.userContact = response[event]['phone_no'];
    //     this.userDate = response[event]['date'];
    // });
  }
  openMyModal(event,data) 
  {
   
    this.model = {  
      FloorCode:data.FloorCode,
      FloorName:data.FloorName,
      MaxRoom: data.MaxRoom,
      Alloted :data.Alloted,
      Unalloted : data.Unalloted,
      IsActive :data.IsActive,
      BranchCode : data.BranchCode,  
    };
  // this.data.subscribe(response => {
  //       this.model.FloorCode  = response[event]['FloorCode'];
  //       this.model.FloorName= response[event]['FloorName'];
       
  //    });
    document.querySelector('#' + event).classList.add('md-show');
  }
  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

}
