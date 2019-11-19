
import { productlist } from './../../_models/Branchmodel';

import {Component, Input, OnInit,ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, empty} from 'rxjs';
import { NgForm } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import {ToastData, ToastOptions, ToastyService} from 'ng2-toasty'
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn,Validators  } from '@angular/forms';
import { BranchService } from '../../_services/branch.service';
import { CompanyService } from '../../_services/company.service';
import { Branchmodel,  } from 'src/app/_models/Branchmodel';
import { Router,ActivatedRoute } from '@angular/router';
import {CustomValidators} from 'ng2-validation';
import { companymodel } from 'src/app/_models/companymodel';
import { ClientProduct } from './../../_models/ClientPorduct';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BranchComponent implements OnInit {

 
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';

   btitle="Add Item";
   sdata:string;
   s1data:any;
  
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
 checkboxx:ClientProduct[];
 branch : Branchmodel[];
 Branchfor:Branchmodel;

 companylist:companymodel[]; 
 submitted = false;
 public data:Observable<Branchmodel>;
 form: FormGroup;
 mode:string;
 ordersData:productlist[];
 slectted:[];
 Show:boolean;
 companyname:any;
  constructor(public _branchservice:BranchService,public router:Router,public formBuilder: FormBuilder,private route: ActivatedRoute,private _companyservice:CompanyService)
   { 
    
    this.mode = "(List)";
   
     this.form = this.formBuilder.group({
       'HotelId': formBuilder.control({ value: '', disabled: true }),
       'PurchaseId': formBuilder.control({ value: '', disabled: false},Validators.required),
       'BranchName': formBuilder.control({ value: '', disabled: false},Validators.required),
       'BranchCode': formBuilder.control({ value: '', disabled: false },Validators.required),
        'HotelMobile': formBuilder.control({ value: '', disabled: false },[Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern('^[7-9][0-9]{9}$')]),
        'HotelEmailId': formBuilder.control({ value: '', disabled: false },[Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),         
        'HotelPassword': formBuilder.control({ value: '', disabled: false },Validators.required),
        'City': formBuilder.control({ value: '', disabled: false },Validators.required),
        'State': formBuilder.control({ value: '', disabled: false }, Validators.required),
        'Nation': formBuilder.control({ value: '', disabled: false }, Validators.required),
        'StateCode': formBuilder.control({ value: '', disabled: false }, Validators.required),
        'HotelAddress': formBuilder.control({ value: '', disabled: false }),
        'ManagerMobileNo': formBuilder.control({ value: '', disabled: false },[Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern('^[7-9][0-9]{9}$')]),
        'ManagerEmail': formBuilder.control({ value: '', disabled: false },[Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
        'PoliceEmail': formBuilder.control({ value: '', disabled: false },[Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
        'GSTNO': formBuilder.control({ value: '', disabled: false },[Validators.required, Validators.pattern('/^([0-9]{2}[a-zA-Z]{4}([a-zA-Z]{1}|[0-9]{1})[0-9]{4}[a-zA-Z]{1}([a-zA-Z]|[0-9]){3}){0,15}$/')]),
        'TaxNo': formBuilder.control({ value: '', disabled: false },[Validators.required]),
        'LicenceNo': formBuilder.control({ value: '', disabled: false },[Validators.required]),
        'PanNo': formBuilder.control({ value: '', disabled: false },[Validators.required]),

        'TrDate': formBuilder.control({ value: '', disabled: false },[Validators.required]),
        'IsActive': formBuilder.control({ value: '', disabled: false }),
        'LicenceType': formBuilder.control({ value: '', disabled: false },[Validators.required]),
        'InstallationBy': formBuilder.control({ value: '', disabled: false },[Validators.required]),
        'InstallationMobileNo': formBuilder.control({ value: '', disabled: false },[Validators.required]),
        orders: new FormArray([])
     });
  
    (this._branchservice.GetCogwaveproduct()).subscribe(orders=>{
      this.ordersData=orders;
      this.addCheckboxes();
    })

   }

   private addCheckboxes() {
    orders: new FormArray([])
    this.ordersData.forEach((o, i) => {
      let fff=this.ordersData[i].IsActive
      let fffc=this.ordersData[i].ProductDescription      
      const control = new FormControl(i===1000); // if first item set to true, else false 
      (this.form.controls.orders as FormArray).push(control);
    });
   
  }
  
 
  Showhide()
  {

    if (this.btitle=="ADD")
    {
      this.form.reset();
      this.Show=true;
      this.btitle="Hide";
      this.mode = "(New)";
    }
    else
    {
      this.Show=false;
      this.btitle="ADD"
      this.form.reset(); 
      this.mode = "(List)";
    }
  }

  
  Submit() 
  {
    
    // console.log(this.form.value.orders);
    // const selectedOrderIdcs = this.form.value.orders.map((v, i) => v ? this.ordersData[i].Id : false)
    // .filter(v => v  !== false);
    //  console.log(selectedOrderIdcs)

    const selectedOrderIds = this.form.value.orders
    .map((v, i) => v ? this.ordersData[i].Id : null)
    .filter(v => v !== null);
     console.log(selectedOrderIds);
     this.sdata=  selectedOrderIds;
     this.submitted = true;
     this.sdata=JSON.stringify(selectedOrderIds)
     console.log(this.sdata);
    // console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.form.value)); 
     var newstr = this.sdata.replace('[','');
     var newstr1 = newstr.replace(']','');
     console.log(newstr1)
      
  }

  Subsmit() 
  {
    const selectedOrderIds = this.form.value.orders
    .map((v, i) => v ? this.ordersData[i].Id : null)
    .filter(v => v !== null);
     console.log(selectedOrderIds);
     this.sdata=  selectedOrderIds;
     this.submitted = true;
    
     this.sdata=JSON.stringify(selectedOrderIds)
     var newstr = this.sdata.replace('[','');
     var newstr1 = newstr.replace(']','');
     console.log(newstr1)
       console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.form.value));     
        if (this.form.invalid) 
        {
            //return;
        }
        this.Branchfor=this.form.value;
        this.Branchfor.ProductArray=newstr1;
         console.log(this.Branchfor); 
         this._branchservice.SaveBranchData(this.Branchfor).subscribe(data=>{ 
          if (data)
           {
             this.form.reset();          
           }   
           this.isShown = false;
           this.ngOnInit();    
         }) 
       
  
  }

 



  ngOnInit()
   {
    
    this.form.reset();
    this.btitle="ADD"
    this.Show=false;
    this.data = this._branchservice.getBranchdata()
     this._companyservice.getcompanydata().subscribe(res => {   
       this.companylist = res ;
     });

  }



  EditForm(Editform)
  { 

    this.mode = "(Edit)";
   this.Show=true
    this.btitle="Hide";
    this.Branchfor=Editform;
     console.log(this.Branchfor)
     this.onTypeChange(this.Branchfor.HotelId);
      this.form = this.formBuilder.group({
        'HotelId': this.formBuilder.control({ value: this.Branchfor.HotelId, disabled: false }),
        'PurchaseId': this.formBuilder.control({ value: this.Branchfor.PurchaseId, disabled: false },Validators.required),
        'BranchName': this.formBuilder.control({ value: this.Branchfor.BranchName, disabled: false},Validators.required ),
        'BranchCode': this.formBuilder.control({ value: this.Branchfor.BranchCode, disabled: false },Validators.required),
        'HotelMobile': this.formBuilder.control({ value: this.Branchfor.HotelMobile, disabled: false },[Validators.required, Validators.minLength(10),Validators.pattern('^[7-9][0-9]{9}$')]),
        'HotelEmailId': this.formBuilder.control({ value: this.Branchfor.HotelEmailId, disabled: false },[Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
        'HotelPassword':this. formBuilder.control({ value: this.Branchfor.HotelPassword, disabled: false },Validators.required),
        'City': this.formBuilder.control({ value: this.Branchfor.City, disabled: false }, Validators.required),
        'State': this.formBuilder.control({ value: this.Branchfor.State, disabled: false }, Validators.required),
        'Nation': this.formBuilder.control({ value: this.Branchfor.Nation, disabled: false }, Validators.required),
        'StateCode': this.formBuilder.control({ value: this.Branchfor.StateCode, disabled: false }, Validators.required),
        'HotelAddress': this.formBuilder.control({ value: this.Branchfor.HotelAddress, disabled: false }),
        'ManagerMobileNo': this.formBuilder.control({ value: this.Branchfor.ManagerMobileNo, disabled: false },[Validators.required, Validators.minLength(10),Validators.pattern('^[7-9][0-9]{9}$')]),
        'ManagerEmail': this.formBuilder.control({ value: this.Branchfor.ManagerEmail, disabled: false },[Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
        'PoliceEmail': this.formBuilder.control({ value: this.Branchfor.PoliceEmail, disabled: false },[Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
        'GSTNO': this.formBuilder.control({ value: this.Branchfor.GSTNO, disabled: false },[Validators.required, Validators.pattern('/^([0-9]{2}[a-zA-Z]{4}([a-zA-Z]{1}|[0-9]{1})[0-9]{4}[a-zA-Z]{1}([a-zA-Z]|[0-9]){3}){0,15}$/')]),
        'TaxNo': this.formBuilder.control({ value: this.Branchfor.TaxNo, disabled: false },[Validators.required]),
        'LicenceNo': this.formBuilder.control({ value: this.Branchfor.LicenceNo, disabled: false },[Validators.required]),
        'PanNo': this.formBuilder.control({ value: this.Branchfor.PanNo, disabled: false },[Validators.required,Validators.pattern('/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/')]),
        'TrDate': this.formBuilder.control({ value: this.Branchfor.TrDate, disabled: false },[Validators.required]),
        'IsActive': this.formBuilder.control({ value: this.Branchfor.IsActive, disabled: false }),
        'LicenceType': this.formBuilder.control({ value: this.Branchfor.LicenceType, disabled: false },[Validators.required]),
        'InstallationBy': this.formBuilder.control({ value: this.Branchfor.InstallationBy, disabled: false },[Validators.required]),
        'InstallationMobileNo': this.formBuilder.control({ value: this.Branchfor.InstallationMobileNo, disabled: false },[Validators.required]),
         orders: new FormArray([])
      });
     

 (this._branchservice.Getproduct("CW_1001")).subscribe((orders:any)=>{
  this.ordersData=orders;
  console.log('Edit' + this.ordersData) 
  this.EditCheckbox('f')
})
  }

     
  // private Chekbo(branch:string) 
  // {
  //   //(this._branchservice.GetCogwaveproduct()).subscribe(dat=>{
  //   this._branchservice.getPorductByBranchcode(branch,1).subscribe(dat=>{
     
  //   //   this.ordersData.forEach((o, i) =>
  //   //   {
  //   //     const element = this._branchservice.getPorductByBranchcode(branch).find(x => x.value === i);
  //   //    const control = new FormControl(i);  // if first item set to true, else false   
  //   //    (this.form.controls.orders as FormArray).push(control);
  //   //  });

  //   })
  //  }   
 

  closeMyModal(event) 
  {
    this.btitle="Add Item";
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }


  private EditCheckbox(branch:string) 
  {
    this.ordersData.forEach((o,i)=>{   
    let ProductId=this.ordersData[i].Id
    console.log(ProductId)              
    const control = new FormControl(this.ordersData[i].IsActive==true); // if first item set to true, else false 
   (this.form.controls.orders as FormArray).push(control);  
 
  
})
   
  }

  onTypeChange(value) {
    this._companyservice.getcompanydata().subscribe(referrences => {
      this.companyname = referrences.ClientName;
    });
  }

}

function minSelectedCheckboxes(min = 1)
{
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev,0);
    return totalSelected >= min ? null : { required: true };
  };
  return validator;
}