
import { state } from '@angular/animations';
import { Alert } from 'selenium-webdriver';
import { productlist } from './../../_models/Branchmodel';

import {Component, Input, OnInit,ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { NgForm, Validators } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import {ToastData, ToastOptions, ToastyService} from 'ng2-toasty'
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { BranchService } from '../../_services/branch.service';
import { CompanyService } from '../../_services/company.service';
import { Branchmodel,  } from 'src/app/_models/Branchmodel';
import { Router,ActivatedRoute } from '@angular/router';
import {CustomValidators} from 'ng2-validation';
import { companymodel } from 'src/app/_models/companymodel';
import { id } from '@swimlane/ngx-datatable/release/utils';

import { of } from 'rxjs';
import { ClientProduct } from './../../_models/ClientPorduct';
import { Identifiers } from '@angular/compiler';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BranchComponent implements OnInit {

  
  
   btitle="Add Item";
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';


  
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
 //ordersData :[];
 companylist:companymodel[]; 
 submitted: boolean;
 data:Observable<Branchmodel>;
 form: FormGroup;
 mode:string;
 ordersData:productlist[];
 slectted:[];
 Show:boolean;
 companyname:any;
  constructor(public _branchservice:BranchService,public router:Router,public formBuilder: FormBuilder,private route: ActivatedRoute,private _companyservice:CompanyService)
   { 
     
   
    
     this.mode="add";
     this.form = this.formBuilder.group({
       'HotelId': formBuilder.control({ value: '', disabled: true }),
       'PurchaseId': formBuilder.control({ value: '', disabled: false }),
       'BranchName': formBuilder.control({ value: '', disabled: false }),
       'BranchCode': formBuilder.control({ value: '', disabled: false }),
        'HotelMobile': formBuilder.control({ value: '', disabled: false }),
        'HotelEmailId': formBuilder.control({ value: '', disabled: false }),
        'HotelPassword': formBuilder.control({ value: '', disabled: false }),
        'City': formBuilder.control({ value: '', disabled: false }),
        'State': formBuilder.control({ value: '', disabled: false }),
        'Nation': formBuilder.control({ value: '', disabled: false }),
        'StateCode': formBuilder.control({ value: '', disabled: false }),
        'HotelAddress': formBuilder.control({ value: '', disabled: false }),
        'ManagerMobileNo': formBuilder.control({ value: '', disabled: false }),
        'ManagerEmail': formBuilder.control({ value: '', disabled: false }),
        'PoliceEmail': formBuilder.control({ value: '', disabled: false }),
        'GSTNO': formBuilder.control({ value: '', disabled: false }),
        'TaxNo': formBuilder.control({ value: '', disabled: false }),
        'LicenceNo': formBuilder.control({ value: '', disabled: false }),
        'PanNo': formBuilder.control({ value: '', disabled: false }),

        'TrDate': formBuilder.control({ value: '', disabled: false }),
        'IsActive': formBuilder.control({ value: '', disabled: false }),
        'LicenceType': formBuilder.control({ value: '', disabled: false }),
        orders: new FormArray([])
     });
  
    // (this._branchservice.GetCogwaveproduct()).subscribe(orders=>{
    //   this.ordersData=orders;
    //   this.addCheckboxes();
    // })

   }


   private addCheckboxes() 
   {
    this.ordersData.forEach((o, i) =>
     { 
      const control = new FormControl(i); // if first item set to true, else false
      {   
        (this.form.controls.orders as FormArray).push(control);
      }
      
    });
    }   
 
  Showhide()
  {

    if (this.btitle=="ADD")
    {
      this.form.reset();
      this.Show=true;
      this.btitle="Hide"  
      
      this._branchservice.GetCogwaveproduct().subscribe(orders=>{
        this.ordersData=orders;
        this.addCheckboxes();
      })

    
    }
    else
    {
      this.Show=false;
      this.btitle="ADD"
      this.form.reset();
      
    }
  }


  Submit() 
  {
    //console.log(this.form);
    console.log(this.form.value); 
    this.Branchfor=this.form.value;
    const selectedOrderIds = this.form.value.orders.map((v, i) => v ? this.ordersData[i].Id : null).filter(v => v !== null);
      

     this.slectted=selectedOrderIds;
         console.log(this.Branchfor); 
         this._branchservice.SaveBranchData(this.Branchfor).subscribe(data=>{ 
           if (data)
           {
             this.form.reset();          
           }   
           this.isShown = false;
           this.ngOnInit();    
         }) 
       
     
    //console.log(selectedOrderIds);
  }

 



  ngOnInit() {
     
    
    this.form.reset();
    this.btitle="ADD"
    this.Show=false;
    this.data = this._branchservice.getBranchdata()
     console.log(this.data)

     this._companyservice.getcompanydata().subscribe(res => {   
       this.companylist = res ;
     });
  }



  EditForm(Editform)
  { 

    this.Show=true
    this.btitle="Hide";
    this.Branchfor=Editform;
    //this.addCheckboxes();
    //alert(this.Branchfor.BranchCode);
    //this.Chekbo(this.Branchfor.BranchCode);
   
     this.onTypeChange(this.Branchfor.HotelId);
      this.form = this.formBuilder.group({
        'HotelId': this.formBuilder.control({ value: this.Branchfor.HotelId, disabled: false }),
        'PurchaseId': this.formBuilder.control({ value: this.Branchfor.PurchaseId, disabled: false }),
        'BranchName': this.formBuilder.control({ value: this.Branchfor.BranchName, disabled: false }),
        'BranchCode': this.formBuilder.control({ value: this.Branchfor.BranchCode, disabled: false }),
        'HotelMobile': this.formBuilder.control({ value: this.Branchfor.HotelMobile, disabled: false }),
        'HotelEmailId': this.formBuilder.control({ value: this.Branchfor.HotelEmailId, disabled: false }),
        'HotelPassword':this. formBuilder.control({ value: this.Branchfor.HotelPassword, disabled: false }),
        'City': this.formBuilder.control({ value: this.Branchfor.City, disabled: false }),
        'State': this.formBuilder.control({ value: this.Branchfor.State, disabled: false }),
        'Nation': this.formBuilder.control({ value: this.Branchfor.Nation, disabled: false }),
        'StateCode': this.formBuilder.control({ value: this.Branchfor.StateCode, disabled: false }),
        'HotelAddress': this.formBuilder.control({ value: this.Branchfor.HotelAddress, disabled: false }),
        'ManagerMobileNo': this.formBuilder.control({ value: this.Branchfor.ManagerMobileNo, disabled: false }),
        'ManagerEmail': this.formBuilder.control({ value: this.Branchfor.ManagerEmail, disabled: false }),
        'PoliceEmail': this.formBuilder.control({ value: this.Branchfor.PoliceEmail, disabled: false }),
        'GSTNO': this.formBuilder.control({ value: this.Branchfor.GSTNO, disabled: false }),
        'TaxNo': this.formBuilder.control({ value: this.Branchfor.TaxNo, disabled: false }),
        'LicenceNo': this.formBuilder.control({ value: this.Branchfor.LicenceNo, disabled: false }),
        'PanNo': this.formBuilder.control({ value: this.Branchfor.PanNo, disabled: false }),
        'TrDate': this.formBuilder.control({ value: this.Branchfor.TrDate, disabled: false }),
        'IsActive': this.formBuilder.control({ value: this.Branchfor.IsActive, disabled: false }),
        'LicenceType': this.formBuilder.control({ value: this.Branchfor.LicenceType, disabled: false }),
        orders: new FormArray([])

      });
  
  }

     
  private Chekbo(branch:string) 
  {
    //(this._branchservice.GetCogwaveproduct()).subscribe(dat=>{
    this._branchservice.getPorductByBranchcode(branch).subscribe(dat=>{
      this.ordersData=dat;
      console.log(dat);
    //   this.ordersData.forEach((o, i) =>
    //   {
    //     const element = this._branchservice.getPorductByBranchcode(branch).find(x => x.value === i);
    //    const control = new FormControl(i);  // if first item set to true, else false
        
    //    (this.form.controls.orders as FormArray).push(control);
    //  });

    })

   }   
 

  closeMyModal(event) 
  {
    this.btitle="Add Item";
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
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