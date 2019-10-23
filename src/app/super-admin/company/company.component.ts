
import {Component, Input, OnInit,ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { NgForm } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import {ToastData, ToastOptions, ToastyService} from 'ng2-toasty'
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';

import { CompanyService } from '../../_services/company.service';
import { environment } from 'src/environments/environment';
import { companymodel } from 'src/app/_models/companymodel';
import { Router,ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
// export class companymodel {
//   Id: number;
//   ClientName: any;
//   ClientAddress: string;
//   MobileNo: string;
//   EmailId: string;
//   Trdate: any;
  
// }
// export class CrmContact {
//   id: number;
//   image: any;
//   name: string;
//   email: string;
//   position: string;
//   office: string;
//   age: number;
//   phone_no: string;
//   date: any;
// }

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: [ './company.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompanyComponent implements OnInit {

  
  public data: Observable<companymodel>;
  
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';

  public Id: number;
  public ClientName: string;
  public ClientAddress: string;
  public MobileNo: string;
  public EmailId: string;
  public Trdate: string;
  isValid:boolean;
  model:any={};
  public isShown:boolean = false;
  @Input('modalDefault') modalDefault: any;  
  title: string;
  msg: string;
  returnUrl:string;
  showClose = true;
  theme = 'bootstrap';
  type = 'default';
  btitle:string;
  closeOther = false;
  constructor(public httpClient: HttpClient,public _companyservice:CompanyService,
    public router:Router,private route: ActivatedRoute,private datePipe:DatePipe) { }

  ngOnInit() {
     
    this.btitle="Add Item";
    this.model.Trdate = this.datePipe.transform(this.model.Trdate,"dd-MM-yyyy");
    console.log( this.model.Trdate); //output - 14-02-2019
   
    this.btitle="Add Item"
    this.data = this._companyservice.getcompanydata()
    console.log(this.data);
    //console.log('fran');

  }


  openMyModal() {  
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
      this.Id=null;
      this.ClientName='';
      this.ClientAddress ='';
      this.MobileNo='';
      this.EmailId='';
      this.Trdate;
      this.btitle="Hide Form"
    }
    
  }


  openMyModalDataview(event,data) {
    //this.Id = event.Id;
    // this.data.subscribe(response => {
    //     this.model.Id = response[data]['Id'];
    //     this.model.ClientName = response[data]['ClientName'];
    //     this.model.ClientAddress = response[data]['ClientAddress'];
    //     this.model.MobileNo = response[data]['MobileNo'];
    //     this.model.EmailId = response[data]['EmailId'];
    //     this.model.Trdate = response[data]['Trdate'];
        
    // });

    this.model = {  
      Id:data.Id,
      ClientName:data.ClientName,
      ClientAddress: data.ClientAddress,
      MobileNo :data.MobileNo,
      EmailId : data.EmailId,
      
    };
    document.querySelector('#' + event).classList.add('md-show');
  }

  
  openMyModalData(event)
   {
    this.btitle="Hide Form"
   
    this.isShown = true;
    
    this.data.subscribe(response => {
        this.model.Id = response[event]['Id'];
        
        this.model.ClientName = response[event]['ClientName'];
       
        this.model.ClientAddress = response[event]['ClientAddress'];
        this.model.MobileNo = response[event]['MobileNo'];
        this.model.EmailId = response[event]['EmailId'];
       // this.model.Trdate = response[event]['Trdate'];
        this.model.Trdate = this.datePipe.transform(response[event]['Trdate'],"MM-dd-yyyy");
        
        console.log(this.model.Trdate)
    });

  }


  resetForm(form?: NgForm)
  {

    if (form = null)
      
      this.isShown = false;
      this.model.Id=null;
      this.model.ClientName='';
      this.model.ClientAddress ='';
      this.model.MobileNo='';
      this.model.EmailId='';
      this.model.Trdate=null;
     
   
    
  }
   // OrderNo: Math.floor(100000 + Math.random() * 900000).toString(),
  closepopup(){   
    this.btitle="Add Item";
    this.isShown = false;
  }


  closeMyModal(event) {
    this.btitle="Add Item";
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }



  onSubmit()
    {
        console.log(this.model)
        
        this.model.Id=null;
        if(this.validateForm())
        {
         this._companyservice.SaveCompanyData(this.model).subscribe(data=>{ 
           if (data)
           {
            if (this.model.Id==null)
            this.resetForm();  
            else
             this.resetForm();   
           }  
           this.isShown = false;
           this.ngOnInit();    
         }) 
        }      
    }
  

    validateForm()
     {
       this.isValid = true;
      if (this.model.ClientName == null)
        this.isValid = false;
      return this.isValid;
    }
  
}












 

 
    
    
   


