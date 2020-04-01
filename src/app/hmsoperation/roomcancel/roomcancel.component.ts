import { MasterformService } from 'src/app/_services/masterform.service';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup,  FormArray,  FormControl,  ValidatorFn,  Validators} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";
import { Observable } from "rxjs";
import { ToastData,ToastOptions,ToastyService } from 'ng2-toasty'
import { OperationService } from 'src/app/_services/operation.service';
@Component({
  selector: 'app-roomcancel',
  templateUrl: './roomcancel.component.html',
  styleUrls: ['./roomcancel.component.scss']
})
export class RoomcancelComponent implements OnInit {
 RoomList:any;
  minDate: Date;
  form: FormGroup;
  Branch:string;
  UserId:number;
  position = 'top-right';
  ledgerlist:any;
  subpaymodelist:any;
  paymentmode: string[] = ["Cash", "Card", "Online", "Walet"];
  public data: Observable<any>;
  public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  public isShown: boolean = false; 
  theme = "bootstrap";
  type = "default";
  closeOther = false;

  filterdata:any;
  constructor(private fb: FormBuilder,
    private _masterservice:MasterformService,private _operservice: OperationService,
    public router: Router, public formBuilder: FormBuilder, 
    private toastyService: ToastyService) {
      this.minDate = new Date();
      this.Branch="CW_1001";
      this.UserId=1;
     } 
     ngOnInit() {
      this.form = this.formBuilder.group({
        roomno: ["0", [Validators.required]],
        // guestname: ["0", [Validators.required]],
        // advance: ["0", [Validators.required]],      
        // tarrif: ["0", [Validators.required]],
        // refuntamt: ["0", [Validators.required]],
        // guestaddress:["",[Validators.required]],
        reason:["",[Validators.required]],
        BranchCode: [this.Branch, [Validators.required]],
        CreatedBy: [this.UserId, [Validators.required]] 
      })

    this._masterservice.GetAllRoomNoViaMode(this.Branch,'O').subscribe(data=>{
      this.RoomList=data;
    })

  }

  Submit(form?: FormGroup) {
 
    console.log(this.form.value)
  
    if (this.form.invalid) {
      console.log(form.value);
      this.addToast("Cogwave Software", "Invalid Data", "warning");
      return;
    }
  
    this._operservice.SaveRoomCancel(this.form.value).subscribe(data => {
      if (data == true) {
        if (form.value.Id == "0") {
          this.addToast(
            "Cogwave Software",
            "Room Cancelled Saved Sucessfully",
            "success"
          );
          form.reset();
        
        } else {
          this.addToast(
            "Cogwave Software",
            "Room Cancelled Updated Sucessfully",
            "success"
          );
          form.reset();      
        }
      } else {
        this.addToast("Cogwave Software", "Room Cancelled Data Not Saved", "error");
        form.reset(); 
       
      }
    });
  
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
