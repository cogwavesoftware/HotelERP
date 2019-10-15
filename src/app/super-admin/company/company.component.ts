
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
  btitle="Add Item";
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
  public isShown:boolean = false;
  @Input('modalDefault') modalDefault: any;  
  title: string;
  msg: string;
  returnUrl:string;
  showClose = true;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;
  constructor(public httpClient: HttpClient,public _companyservice:CompanyService,
    public router:Router,private route: ActivatedRoute,) { }

  ngOnInit() {

    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
   // this.data1 = this.httpClient.get<CrmContact>(`assets/data/crm-contact.json`);
    //console.log(this.data1)
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


  openMyModalDataview(event) {
    this.Id = event.Id;
    this.data.subscribe(response => {
        this.Id = response[event]['Id'];
        this.ClientName = response[event]['ClientName'];
        this.ClientAddress = response[event]['ClientAddress'];
        this.MobileNo = response[event]['MobileNo'];
        this.EmailId = response[event]['EmailId'];
        this.Trdate = response[event]['Trdate'];
        
    });
  }

  
  openMyModalData(event)
   {
    this.btitle="Hide Form"
   
    this.isShown = true;
    
    this.data.subscribe(response => {
        this.Id = response[event]['Id'];
        console.log('client ' + this.Id)
        this.ClientName = response[event]['ClientName'];
        console.log('client ' + this.ClientName)
        this.ClientAddress = response[event]['ClientAddress'];
        this.MobileNo = response[event]['MobileNo'];
        this.EmailId = response[event]['EmailId'];
        this.Trdate = response[event]['Trdate'];
        
    });
  }


  resetForm(form?: NgForm)
  {

    if (form = null)
      
      this.isShown = false;
      this.Id=null;
      this.ClientName='';
      this.ClientAddress ='';
      this.MobileNo='';
      this.EmailId='';
      this.Trdate;
     
    // this._companyservice.formData = {
    //   Id: null,
    //   ClientName: '',
    //   ClientAddress: '',
    //   MobileNo: '',
    //   EmailId: '',
    //   Trdate:'' ,
    // };ss
    
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



  onSubmit(form: NgForm)
    {
        if(this.validateForm())
        {
         this._companyservice.SaveCompanyData(form.value).subscribe(data=>{ 
           if (data)
           {
            if (form.value.Id==null)
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
      if (this.ClientName == null)
        this.isValid = false;
      return this.isValid;
    }
  
}












 

 
    
    
   


