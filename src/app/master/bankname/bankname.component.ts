
import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";

import { Observable } from 'rxjs';
import { MasterformService } from './../../_services/masterform.service';

import { IpserviceService } from 'src/app/_services/ipservice.service';


@Component({
  selector: 'app-bankname',
  templateUrl: './bankname.component.html',
  styleUrls: ['./bankname.component.scss']
})
export class BanknameComponent implements OnInit {
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
  
  constructor(private _masterformservice:MasterformService,private _ipservice:IpserviceService,
    ) { }
   
  ngOnInit() 
  {
 
  this.btitle="Add Item"
  //this.data = this._masterformservice.GetBankdetails()
  console.log(this.data)
  this.model.BranchCode=localStorage.getItem('BranchCode');
  this.model.IpAdd=localStorage.getItem('LOCAL_IP');
  this.model.CreatedBy=localStorage.getItem('id');
   console.log(this.model.BranchCode)
   console.log(this.model.IpAdd)
   console.log(this.model.CreatedBy)

   if(!this.model.BranchCode)
   {
     this.data = this._masterformservice.GetBankdetails('CW_1001')
   }
   else
   {
     this.data = this._masterformservice.GetBankdetails(this.model.BranchCode)
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
      Name:null,
      IFSCCode:null,
      BankBranchName:null,
      City:null,
      BankBranchCode:null,
      MICRCode:null,
      Address:null,
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
      this.model.Name=response[event]['Name'];
      this.model.IFSCCode=response[event]['IFSCCode'];
      this.model.BankBranchName=response[event]['BankBranchName'];
      this.model.City=response[event]['City'];
      this.model.BankBranchCode=response[event]['BankBranchCode'];
      this.model.MICRCode=response[event]['MICRCode'];
      this.model.Address=response[event]['Address'];
      this.model.IsActive=response[event]['IsActive']; 
      this.model.BranchCode=response[event]['BranchCode']; 
      this.model.IpAdd=response[event]['IpAdd'];  
      this.model.ModifyBy=response[event]['ModifyBy'];    
    });
  
  }

  onSubmit()
  {
    console.log(this.form.value);
    console.log(this.form.value.Address);
    this.form.value.Address
    if (this.form.valid)
    {
      console.log("Form Submitted!");
    //  this.form.reset();
    }
    //this.form.reset();
  }


  Closeform() 
  {
      //this.btitle="Add Item"  
      this.resetForm();  
     
      // this.model.BranchCode=localStorage.getItem('BranchCode');
      // this.model.IpAdd=localStorage.getItem('LOCAL_IP');
      // this.model.CreatedBy=localStorage.getItem('id');
      // this.form.set('BranchCode').value='f'
     //this.isShown = false;   
  }


  openMyModal(event,data) 
  {
    this.model = {  
      Id:data.Id,
      Name:data.Name,
      IFSCCode: data.IFSCCode,
      BankBranchName :data.BankBranchName,
      MICRCode : data.MICRCode,
      BankBranchCode:data.BankBranchCode,
      IsActive :data.IsActive,
      Address : data.Address,  
    };
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
}
