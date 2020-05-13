import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import {  FormBuilder, FormGroup,  FormArray,  FormControl,  ValidatorFn,  Validators} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";
import { Observable, Observer, empty, fromEvent } from "rxjs";
import { OperationService } from 'src/app/_services/operation.service';
import { MasterformService } from 'src/app/_services/masterform.service';
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
import { filter, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators'
@Component({
  selector: 'app-driverdetail',
  templateUrl: './driverdetail.component.html',
  styleUrls: ['./driverdetail.component.scss']
})
export class DriverdetailComponent implements OnInit {
  form: FormGroup;
  Branch:string;
  filterQuery:string;
  UserId:string;
  driverlist:any;
  RoomList:any;
  public data: Observable<any>;
  filterdata:any;


  position = 'top-right';
  dtat: string;
  title: string;
  msg: string;
  returnUrl: string;
  showClose = true;
  theme = "bootstrap";
  type = "default";
  closeOther = false;

  @ViewChild('searchTermdriver', { static: false }) searchTermdriver: ElementRef;
  constructor(private fb: FormBuilder,
    private _masterservice:MasterformService,private _operservice: OperationService,
    public router: Router, public formBuilder: FormBuilder,private toastyService: ToastyService ) { 
      this.Branch=localStorage.getItem('BranchCode');
      this.UserId=localStorage.getItem('id');
    }

  ngOnInit() {
    this.form = this.formBuilder.group({
      DriverId: [, [Validators.required]], 
      drivername: ["", [Validators.required]],
      MobileNo: ["", [Validators.required]],
      vehicleno: ["", [Validators.required]],
      charge: ["", [Validators.required]],
      CreatedBy: [this.UserId, [Validators.required]],
      BranchCode: [this.Branch, [Validators.required]],
      roomno: ["0", [Validators.required]]
    })

    this._masterservice.GetAllRoomNoViaMode(this.Branch,'O').subscribe(data=>{
      this.RoomList=data;
    })
  }


  ngAfterViewInit()
  {
    fromEvent(this.searchTermdriver.nativeElement, 'keyup')
      .pipe(
        filter(text => this.searchTermdriver.nativeElement.value.length > 2),
        debounceTime(1000),
        distinctUntilChanged(),
        // tap(x=>console.log('from tap' + x)),
        switchMap(id => {
          //console.log(id)

          return this._masterservice.SearchDriverData(this.Branch, this.searchTermdriver.nativeElement.value);
        })
      ).subscribe(res => {
        this.driverlist = res;
        console.log('this.driverlist');
        console.log(this.driverlist);
      });
  }

  OpenDrivermodelsDetail(SelectedData: any, event: any) {
    this.form.patchValue({
      DriverId: SelectedData.DriverId,
      drivername: SelectedData.DriverName,
      MobileNo: SelectedData.MobileNo,
      vehicleno: SelectedData.VechileNo,
      charge: SelectedData.ChargeAmount,
    })
    console.log(SelectedData)
    var allbtn = document.querySelector('.md-show');
    console.log(allbtn);
    allbtn.classList.remove("md-show");
  }



  Submit(driverform:FormGroup)
  { 
    console.log(driverform.value) 
    this._operservice.SaveDriverDetails(driverform.value).subscribe(res=>{
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

  Opendrivermodel(event, data) {
    this.filterQuery = "";
    document.querySelector("#" + event).classList.add("md-show");
  }

  closeMyModalPin(event) {
    event.target.parentElement.parentElement.parentElement.classList.remove(
      "md-show"
    );
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
