
// import { Component, OnInit,ViewChild } from '@angular/core';
// import { NgForm } from "@angular/forms";
// import { Observable } from 'rxjs';
// import { MasterformService } from './../../_services/masterform.service';
// import { IpserviceService } from 'src/app/_services/ipservice.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Observable } from 'rxjs';
import { MasterformService } from './../../_services/masterform.service';
import { IpserviceService } from 'src/app/_services/ipservice.service';

@Component({
  selector: 'app-planmaster',
  templateUrl: './planmaster.component.html',
  styleUrls: ['./planmaster.component.scss']
})

export class PlanmasterComponent implements OnInit {
  public data: Observable<any>;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  public isShown:boolean = false;
  model: any = {};
  btitle:string="Add";
  isValid:boolean;

  dtat:string;
  title: string;
  msg: string;
  returnUrl:string;
  showClose = true;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;
  isroomt:string;
  isroomc:string;
  ipAddress:string;
 
  @ViewChild('f',{static:false}) form: any;
  
  constructor(private _masterformservice:MasterformService,private _ipservice:IpserviceService) { }
   
  ngOnInit() 
  {
 
  this.btitle="Add Item"
  this.data = this._masterformservice.getplan()
  console.log(this.data)
  
  this.model.IpAdd=localStorage.getItem('LOCAL_IP');
  this.model.CreatedBy=localStorage.getItem('id');
   
   console.log(this.model.IpAdd)
   console.log(this.model.CreatedBy)
  }
  
 


 
  Showhide()
  {
   this.resetForm();
   
   if (this.btitle=="Hide Form"){
    this.isShown = false;
    this.btitle="Add Item"}
   else{    
    this.isShown = true; 
    this.btitle="Hide Form"
    }
    
  }
  
  resetForm(form?: NgForm)
  {
     this.model = {
      Id: 0,
      PlanName:null,
      HSNCode:null,
      PlanDescription:null, 
      IsActive:null,
      IpAdd:localStorage.getItem('LOCAL_IP'),
      CreatedBy:localStorage.getItem('id'),
    };  
  }

  openMyModalData(event) {
   // CreatedBy
   //IpAdd
    this.btitle="Hide Form"    
    this.isShown = true;
    this.data.subscribe(response => {
      this.model.Id=response[event]['Id'];
      this.model.PlanName=response[event]['PlanName'];
      this.model.HSNCode=response[event]['HSNCode'];
      this.model.PlanDescription=response[event]['PlanDescription'];
      this.model.IsActive=response[event]['IsActive']; 
      this.model.IpAdd=response[event]['IpAdd'];  
      this.model.ModifyBy=response[event]['ModifyBy'];    
    });
  
  }



  onSubmit()
  {
    console.log(this.form.value);  
    if (this.form.valid)
    {
      console.log("Form Submitted!"); 
    } 
  }


  Closeform() 
  {
      this.resetForm();  
  }


  openMyModal(event,data) 
  {
    this.model = {  
      Id:data.Id,
      PlanName:data.PlanName,
      HSNCode: data.HSNCode,
      PlanDescription:data.PlanDescription,
      IsActive :data.IsActive,
        
    };
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
}