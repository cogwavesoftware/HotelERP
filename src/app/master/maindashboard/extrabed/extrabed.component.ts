import { stringify } from '@angular/compiler/src/util';
import { ExtraBedFormmodel } from './../../../_models/ExtraBedFormmodel';
import { environment } from 'src/environments/environment';
import { Component, OnInit, Inject, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import {
  FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn,
  Validators, NgModel
} from "@angular/forms";
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { MasterformService } from 'src/app/_services/masterform.service';
import { DatePipe } from "@angular/common";
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
import { OperationService } from 'src/app/_services/operation.service';
import { Commonmodel } from './../../../_models/Commonmodel';
import { BankService } from 'src/app/_services/bank.service'; 
import { Observable, Observer, empty, fromEvent } from "rxjs";
 @Component({
  selector: 'app-extrabed',
  templateUrl: './extrabed.component.html',
  styleUrls: ['./extrabed.component.scss']
})
export class ExtrabedComponent implements OnInit {
  // model:any;
  // @Input() RoomCode: string;
  // @Input() RoomNo: string;
  @Input() extrabedform:ExtraBedFormmodel;
  Branch: string;
  Roomadvanceform: FormGroup;
  addgstform:FormGroup;
  submitted = false;
  subpaymodelist:any;
  theme = "bootstrap";
  type = "default";
  position = 'top-right';
  paymentmode: string[] = ["Cash", "Card", "Online", "Walet"];
  previewUrl: any = null;
  previewUrl2: any = null;
  previewUrl3: any = null;
  GuetIdFront0: any = null;
  GuetImg0; GuetImg1; GuetImg2; GuetImg3: any = null;
  GuetIdFront1; GuetIdFront2; GuetIdFront3: any = null;
  GuetIdBack0; GuetIdBack1; GuetIdBack2; GuetIdBack3: any = null;
  fileDataIdfront: File = null;
  fileDataIdBack: File = null;
  fileDataIdfrontSecGuest: File = null;
  fileDataIdBackSecGuest: File = null;
  back = false;
  Id$: Observable<string>;
  guest: any;  
  picodelist: any;
  public filterQuery = "";
  public data: Observable<any> 
  model: any = {};

  constructor(  
    public router: Router,public formBuilder1: FormBuilder,
    public formBuilder: FormBuilder,private _oprservice:OperationService,
    private toastyService: ToastyService, private _bankservice: BankService,
    private route: ActivatedRoute, 
    private _masterservice: MasterformService ) {
      this.Branch="CW_1001"   
     }
 

 ngOnInit() {
    this.extrabedform={
      Id: 0,
      BranchCode: "0",
      IpAdd: "0",
      CreatedBy: 0,
      RoomNo: "0",
      RoomCode: "0",
      GuestName: "0",
      NoofBed: 0,
      Tarif: 0,
      BedAmount: 0,
      TotalBedAmount: 0,
      TaxAmount: 0,
      NetAmount: 0,
      Reason: "0",
      Mode: "0",  
      }    
      this.addgstform  =  this.formBuilder1.group({
        RoomNo:[ this.extrabedform.RoomNo, Validators.required],
        guestname: ['', Validators.required] ,
        title: ['', Validators.required] ,
        gender:['', Validators.required] ,
        mobile:['', Validators.required] ,
        email:['', Validators.required] ,
        pincode:['', Validators.required] ,
        Area:['', Validators.required] ,
        city:['', Validators.required] ,
        state:['', Validators.required] ,
        StateCode:['', Validators.required] ,
        nation:['', Validators.required] ,
        gstno:['', Validators.required] ,
        address1:['', Validators.required] ,
        address2:['', Validators.required] ,
        address3:['', Validators.required] ,
        GuestIdFront: ["", [Validators.required]],
        GuestIdBack: ["", [Validators.required]]
    });
    this.previewUrl = environment.GuestimagePath + '/imagenot.png';
    this.previewUrl2 = environment.GuestimagePath + '/imagenot1.png';
    this.previewUrl3 = environment.GuestimagePath + '/imagenot1.png';
    this.GuetIdFront0 = environment.GuestimagePath + '/imagenot1.png';
    this.GuetIdBack0 = environment.GuestimagePath + '/imagenot1.png';
    }

  
    SaveExtraBedw(form?: NgForm)
    {
     
       if (form.invalid) {
        console.log(form.value);
        this.addToast("Cogwave Software", "invalid Data", "warning");
        return;
      }

    }

    CalculateTaxAmount(RoomNo:string,NoofBed:number)
    {
      this._oprservice.GetExtraBedFormData(this.Branch,RoomNo,NoofBed).subscribe(res=>{
        this.extrabedform=res;
      })
    }

    SaveExtraBed(form?: NgForm) {
     
       form.value.BranchCode = localStorage.getItem("BranchCode")
       form.value.CreatedBy = localStorage.getItem("id")
      
      if (form.invalid) {
        console.log(form.value);
        this.addToast("Cogwave Software", "invalid Data", "warning");
        return;
      }
      this._oprservice.SaveExtraBed(form.value).subscribe(data => {
        if (data == true) {
            this.addToast(  "Cogwave Software", "ExtraBed Saved Sucessfully","success" );       
        } 
        else {
          this.addToast("Cogwave Software", "ExtraBed Data Not Saved", "error");  
        }
      },error=>{
        console.log('error')
        console.log(error)
        this.addToast("Cogwave Software", error, "error");
      },
      ()=>{
              this.closeMyModalPin(event,form)
      });
    
    }


    closeMyModalPin(event,form?:NgForm) {   
     
      var openModals = document.querySelectorAll(".md-show");
      for (let i = 0; i < openModals.length; i++) {
        openModals[i].classList.remove("md-show");
      }
    }

    openguestmodel(event){ 
      document.querySelector("#" + event).classList.add("md-show");
    }
     
    closeguestModal (event) {  
      var openModals = document.querySelectorAll(".md-show");
      for (let i = 0; i < openModals.length; i++) {
        openModals[i].classList.remove("md-show");
      }
    }
    secondaryGuestModel(event, data, j) {
  
      this._bankservice.changeindexvalue(j);
      document.querySelector("#" + event).classList.add("md-show");
    }

    openMyModalPincodePopup(event, data, j) {
      this.filterQuery = "";
      this._bankservice.changeindexvalue(j);
      document.querySelector("#" + event).classList.add("md-show");
    } 

 


    addToast(title, Message, theme) {
      debugger;
      this.toastyService.clearAll();
      const toastOptions: ToastOptions = {
        title: title,
        msg: Message,
        showClose: false,
        timeout: 3000,
        theme: theme,
        onAdd: (toast: ToastData) => {
          //console.log('Toast ' + toast.id + ' has been added!');
          // this.router.navigate(['/dashboard/default']);
        },
        onRemove: (toast: ToastData) => {
          /* removed */
        }
      };
  
      switch (theme) {
        case "default":
          this.toastyService.default(toastOptions);
          break;
        case "info":
          this.toastyService.info(toastOptions);
          break;
        case "success":
          debugger;
          this.toastyService.success(toastOptions);
          break;
        case "wait":
          this.toastyService.wait(toastOptions);
          break;
        case "error":
          this.toastyService.error(toastOptions);
          break;
        case "warning":
          this.toastyService.warning(toastOptions);
          break;
      }
    }
}
