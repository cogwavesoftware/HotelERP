
import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Observable } from 'rxjs';
import { MasterformService } from './../../_services/masterform.service';
import { IpserviceService } from 'src/app/_services/ipservice.service';

@Component({
  selector: 'app-booking-reference',
  templateUrl: './booking-reference.component.html',
  styleUrls: ['./booking-reference.component.scss']
})

export class BookingReferenceComponent implements OnInit {
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
  //this.data = this._masterformservice.getreferencedetail()
  console.log(this.data)
  this.model.BranchCode=localStorage.getItem('BranchCode');
  this.model.IpAdd=localStorage.getItem('LOCAL_IP');
  this.model.CreatedBy=localStorage.getItem('id');
   console.log(this.model.BranchCode)
   console.log(this.model.IpAdd)
   console.log(this.model.CreatedBy)
   if(!this.model.BranchCode)
   {
     this.data = this._masterformservice.getreferencedetail('CW_1001')
   }
   else
   {
     this.data = this._masterformservice.getreferencedetail(this.model.BranchCode)
   }

  }
  
  getIP()
  {
    this._ipservice.getIpAddress().subscribe((res:any)=>{
      this.ipAddress=res.ip;
      console.log(this.ipAddress)
    });
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
      RefName:null,
      RefEmail:null,
      RefMobileNo:null,
      RefAdress:null,
      RefDob:null,
      RefPoints:null,
     
      IsActive:null,
      BranchCode:localStorage.getItem('BranchCode'),
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
      this.model.RefName=response[event]['RefName'];
      this.model.RefEmail=response[event]['RefEmail'];
      this.model.RefMobileNo=response[event]['RefMobileNo'];
      this.model.RefAdress=response[event]['RefAdress'];
      this.model.RefDob=response[event]['RefDob'];
      this.model.RefPoints=response[event]['RefPoints'];
      this.model.IsActive=response[event]['IsActive']; 
      this.model.BranchCode=response[event]['BranchCode']; 
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
      RefName:data.RefName,
      RefEmail: data.RefEmail,
      RefMobileNo :data.RefMobileNo,
      RefDob : data.RefDob,
      RefPoints:data.RefPoints,
      IsActive :data.IsActive,
      RefAdress : data.RefAdress,  
    };
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
}











 
//   fullUpdate() {
//     this.form.setValue({firstName: 'Partial', password: 'monkey'});
// }

// partialUpdate() {
//     this.model.patchValue({RefName: 'Partial'});
// }

   // this.form.valueChanges
    //     .map((value) => {
    //         value.RefName = value.RefName.toUpperCase();
    //         return value;
            
    //     })
    //     .filter((value) => this.form.valid)
    //     .subscribe((value) => {
    //        console.log("Model Driven Form valid value: vm = ",
    //                    JSON.stringify(value));
    //     });