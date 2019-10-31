import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { MasterformService } from '../../../_services/masterform.service';
import { IpserviceService } from 'src/app/_services/ipservice.service';
import { Observable } from "rxjs"; 
import { DatePipe } from "@angular/common";
@Component({
  selector: 'app-taxmaster',
  templateUrl: './taxmaster.component.html',
  styleUrls: ['./taxmaster.component.scss']
})
export class TaxmasterComponent implements OnInit {   
  public TaxCode:any; 
  public data: Observable<any>;

  public filterdatax: any;

  public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
   
  isValid: boolean;
  public isShown: boolean = false;
  dtat: string;
  title: string;
  msg: string;
  returnUrl: string;
  showClose = true;
  theme = "bootstrap";
  type = "default";
  closeOther = false;
  btitle: string = "Add Floor";
  model: any = {};
  IsExistdata: boolean = false;
  ipAddress:string;
  @ViewChild("f", { static: false }) form: any;
  constructor(private datePipe: DatePipe,private _masterformservice:MasterformService,private _ipservice:IpserviceService) { }

  ngOnInit() {   
    this.btitle="Add Item";
    this.model.TaxCode ="1";  
     
    console.log(this.data)
    this.model.BranchCode=localStorage.getItem('BranchCode');
    this.model.IpAdd=localStorage.getItem('LOCAL_IP');
    this.model.CreatedBy=localStorage.getItem('id');
     console.log(this.model.BranchCode)
     console.log(this.model.IpAdd)
     console.log(this.model.CreatedBy)
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
      TaxCode:null,   
      TaxName:null,
      EffectiveDate:null,
      ToDate:null,         
      BranchCode:localStorage.getItem('BranchCode'),
      IpAdd:localStorage.getItem('LOCAL_IP'),
      CreatedBy:localStorage.getItem('id'),
    };  
  }
  openMyModalData(event) {     
     this.btitle="Hide Form"    
     this.isShown = true;
     this.data.subscribe(response => {
       this.model.Id=response[event]['Id'];
       this.model.TaxCode=response[event]['TaxCode'];   
       this.model.TaxName=response[event]['TaxName']; 
       this.model.EffectiveDate=response[event]['EffectiveDate']; 
       this.model.ToDate=response[event]['ToDate'];      
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
      TaxCode:data.TaxCode,   
      TaxName: data.TaxName,
      EffectiveDate:data.EffectiveDate,
      ToDate:data.ToDate      
    };
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
}
