import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Observable } from 'rxjs';
import { MasterformService } from './../../_services/masterform.service';
import { IpserviceService } from 'src/app/_services/ipservice.service';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

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
 
  @ViewChild('f',{static:false}) form: any
  constructor(private _masterformservice:MasterformService,private _ipservice:IpserviceService) { }

  ngOnInit() {
    this.btitle="Add Item";    
    console.log(this.data)     
    this.model.IpAdd=localStorage.getItem('LOCAL_IP');
    this.model.CreatedBy=localStorage.getItem('id');      
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
      City:null,   
      Pincode:null,
      State:null,
       
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
       this.model.City=response[event]['City'];    
       this.model.Pincode=response[event]['Pincode'];   
       this.model.State=response[event]['State'];       
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
       City:data.City,   
       Pincode: data.Pincode,
       State:data.State,
        
     };
     document.querySelector('#' + event).classList.add('md-show');
   }
   closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

}
