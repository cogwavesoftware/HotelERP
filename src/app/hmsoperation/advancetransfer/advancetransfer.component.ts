import { Component, OnInit } from '@angular/core';
import { OperationService } from 'src/app/_services/operation.service';
import { MasterformService } from 'src/app/_services/masterform.service';
 import {  FormBuilder, FormGroup,  FormArray,  FormControl,  ValidatorFn,  Validators} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
 import { Observable } from "rxjs";
import { ToastData,ToastOptions,ToastyService } from 'ng2-toasty'

@Component({
  selector: 'app-advancetransfer',
  templateUrl: './advancetransfer.component.html',
  styleUrls: ['./advancetransfer.component.scss']
})
export class AdvancetransferComponent implements OnInit {
  form: FormGroup;
  public data: Observable<any>;
  public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  public isShown: boolean = false;
  model: any = {};
  btitle: string = "Add";
  isValid: boolean;
  dtat: string;
  title: string;
  msg: string;
  returnUrl: string;
  showClose = true;
  closeOther = false;
  isroomt: string;
  isroomc: string;
  ipAddress: string;
  position = 'top-right';
  theme = "bootstrap";
  type = "default";
  mode: string;
  Branch: string;
  UserId: string;
  filterdata: any;
  IsExistdata: boolean;
  RoomList:any;
  constructor(private fb: FormBuilder,
    private _masterservice:MasterformService,private _operservice: OperationService,
    public router: Router, public formBuilder: FormBuilder, private toastyService: ToastyService,
    
    ) { 
    this.Branch=localStorage.getItem('BranchCode')
    this.UserId=localStorage.getItem('id')
    }

  ngOnInit() {


    this._masterservice.GetAllRoomNoViaMode(this.Branch,"O").subscribe(res => {
      this.RoomList = res;
      
    });

    this.data = this._operservice.GetAdvancelistForOccupiedRoom("CW_1001");

    this.form = this.formBuilder.group({
      Id: ["0", [Validators.required]], 
      BranchCode: [this.Branch, [Validators.required]],     
      CreatedBy: [this.UserId, [Validators.required]],
      ReceiptNo: ["", [Validators.required]],     
      Amount: ["", [Validators.required]],
      transroomno: ["0", [Validators.required]] 
    })
  }

  EditForm(EditForm)
  {
    this.form = this.formBuilder.group({
      Id: ["0", [Validators.required]], 
      BranchCode: [this.Branch, [Validators.required]],     
      CreatedBy: [this.UserId, [Validators.required]],
      ReceiptNo: [EditForm.ReceiptNo, [Validators.required]],     
      Amount: [EditForm.PaidAmount, [Validators.required]],
      transroomno: ["0", [Validators.required]] 
    })
  }

 


  Submit()
  { 
    this.form.patchValue({
      BranchCode:this.Branch,
      ModifyBy:this.UserId
    }) 
    this._operservice.AdvanceTransfer(this.form.value).subscribe(res=>{
     if(res==true)
       {
        this.addToast(
          "Cogwave Software Technologies Pvt Ltd..", "Congratulations Data Saved Sucessfully", "Success"  
        );
       }
       else
       {
        this.addToast("Cogwave Software", "Sorry Data Not Saved Sucessfully ", "error");
       }
    },
    error=>{
      console.log(error.message)
      console.log('error.message')
       this.addToast("Cogwave Software", error.message, "error");
    },
    ()=>{
      this.form.reset();
      this.router.navigate(["/Master/dashboard"]);
    })
   
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
