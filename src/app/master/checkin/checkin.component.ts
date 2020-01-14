 
import { Component, OnDestroy,OnInit,ViewEncapsulation } from '@angular/core';
import {Observable, empty} from 'rxjs';
import { NgForm } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn,Validators  } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {IOption} from 'ng-select';
import {Subscription} from 'rxjs/Subscription';

import { SelectOptionService } from 'src/app/shared/elements/select-option.service';
 import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/first';
 
import {animate, style, transition, trigger} from '@angular/animations';
declare var $: any;
 
@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss'],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class CheckinComponent implements OnInit {
  form: FormGroup;
  model:any = {};
  simpleOption: Array<IOption> = this.selectOptionService.getCharacters();
  selectedOption = '3';
  isDisabled = true;
  characters: Array<IOption>;
  selectedCharacter = '3';
  timeLeft = 5;

  private dataSub: Subscription = null;

  public navRight: string;
  gendercategory : string [] =  ['Mr','Miss1', 'Mrs'];
  gendercatagerys : string[] =  ['Male', 'Female'];
  paymentmode:string[] = ['Online', 'Credit Card','Cash'];
  public noofdays: string[] = ['1', '2', '3', '4', '5', '6'];
  bookingtypes:string[] = ['OT',"Traval"];
  foriegnguest:string[] = ['Guest1','Guest2'];
  Cities:string[] = ['TN','KA'];
  sourcelist:string [] = ['source1','source2'];
  arivalmode = ['Banas Kandha','Naja'];
  discounttypes = ['aaaa','bbbbb'];
  genderitems:any;
  gender:any;
  pincode:any;

 

  countries: Array<IOption> = this.selectOptionService.getCountries();
  
 
  constructor( public router:Router,public formBuilder: FormBuilder,private route: ActivatedRoute,public selectOptionService: SelectOptionService   ) { 
    this.navRight = 'nav-off'; 
     this.form = this.formBuilder.group({       
      'referenceid': formBuilder.control({ value: '', disabled: false},Validators.required),    
      'source': formBuilder.control({value:'', disabled:false},Validators.required ),
      'arivalmode': formBuilder.control({value:'',disabled:false}, Validators.required),
      'booking': formBuilder.control({value:'',disabled:false}, Validators.required),
      'convenience': formBuilder.control({value:'',disabled:false}, Validators.required),
      'guestname':formBuilder.control({value:'',disabled:false}, Validators.required),
      'gender':formBuilder.control({value:'',disabled:false}, Validators.required),
      'mobile':formBuilder.control({value:'',disabled:false}, Validators.required),
      'email':formBuilder.control({value:'',disabled:false}, Validators.required),
      'foriegnguest':formBuilder.control({value:'',disabled:false}, Validators.required),
      'address':formBuilder.control({value:'',disabled:false}, Validators.required),
      'pincode':formBuilder.control({value:'',disabled:false}, Validators.required),
      'city':formBuilder.control({value:'',disabled:false}, Validators.required),
      'state':formBuilder.control({value:'',disabled:false}, Validators.required),
      'nation':formBuilder.control({value:'',disabled:false}, Validators.required),
      'company':formBuilder.control({value:'',disabled:false}, Validators.required),
      'gstno':formBuilder.control({value:'',disabled:false}, Validators.required),
      'checkindate':formBuilder.control({value:'',disabled:false}, Validators.required),
      'checkintime':formBuilder.control({value:'',disabled:false}, Validators.required),
      'checkoutdate':formBuilder.control({value:'',disabled:false}, Validators.required),
      'checkouttime':formBuilder.control({value:'',disabled:false}, Validators.required),      
      'nofdays':formBuilder.control({value:'',disabled:false}, Validators.required),
      'selmode':formBuilder.control({value:'',disabled:false}, Validators.required),
      'payamount':formBuilder.control({value:'',disabled:false}, Validators.required),
      'paymntdesc':formBuilder.control({value:'',disabled:false}, Validators.required),
      'disctype':formBuilder.control({value:'',disabled:false}, Validators.required),
      'applycoupen':formBuilder.control({value:'',disabled:false}, Validators.required),
      'discvalue':formBuilder.control({value:'',disabled:false}, Validators.required),
      'graceperiod':formBuilder.control({value:'',disabled:false}, Validators.required),
      'thumbverification':formBuilder.control({value:'',disabled:false}, Validators.required),
        orders: new FormArray([])
    });
  }

  ngOnInit() {
    $(document).ready(function() {
      console.log('I am Called From jQuery');
    });
    this.model = {
        roomno:1000,
        name:null,
        gender:null,
        address:null,
        pincode:null,
        state:null,
        company:null,
        gstno:null,
        mobile:null,
        email:null,
        ARFrom:null,
        proceeding:null,
        purvisit:null,
        DOB:null,
        IsActive:null,
        nofdays:null,
        checkindate:null,
        checkoutdate:null
    };

    this.runTimer();
    this.dataSub = this.selectOptionService.loadCharacters().subscribe((options) => {
      this.characters = options;
    });
  
     

  }
  openguestnamedetails(event){      
    setTimeout(()=>{
      console.log("openguestnamedetails calling");  
    },1000);
    document.querySelector("#" + event).classList.add("md-show");
  }
  openpincodedetails(event){      
    setTimeout(()=>{
      console.log("openpincodedetails calling");  
    },1000);
    document.querySelector("#" + event).classList.add("md-show");
  }
  opencitydetails(event){      
    setTimeout(()=>{
      console.log("opencitydetails calling");  
    },1000);
    document.querySelector("#" + event).classList.add("md-show");
  }
  
  openreferencedetails(event){      
    setTimeout(()=>{
      console.log("openreferencedetails calling");  
    },1000);
    document.querySelector("#" + event).classList.add("md-show");
  }
  opencompanydetails(event){      
    setTimeout(()=>{
      console.log("compamny calling");  
    },1000);
    document.querySelector("#" + event).classList.add("md-show");
  }
  openproceedingdetails(event){      
    setTimeout(()=>{
      console.log("openprocedingdetails calling");  
    },1000);
    document.querySelector("#" + event).classList.add("md-show");
  }
  openARdetails(event){      
    setTimeout(()=>{
      console.log("openARdetails calling");  
    },1000);
    document.querySelector("#" + event).classList.add("md-show");
  }
  closeMyModal(event){
    document.querySelector("#" + event).classList.add("md-close");
    document.querySelector("#" + event).classList.remove("md-show");
  }
  runTimer() {
    const timer = setInterval(() => {
      this.timeLeft -= 1;
      if (this.timeLeft === 0) {
        clearInterval(timer);
      }
    }, 1000);
  }
  
}
