
import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Observable, empty } from "rxjs";
import { NgForm } from "@angular/forms";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn,
  Validators
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { IOption } from "ng-select";
import { Subscription } from "rxjs/Subscription";
import { SelectOptionService } from "src/app/shared/elements/select-option.service";
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/first';
import { animate, style, transition, trigger } from "@angular/animations";
import { RoomtypeService } from "./../../_services/roomtype.service";
import { MasterformService } from "src/app/_services/masterform.service";
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { AddressService } from './../../_services/address.service';
import { environment } from 'src/environments/environment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from "@angular/common";
export interface Checkinss {
  RoomCode: string;
  RoomNo: string;
  Pax: number;
  PlanName: string;
  Food: number;
  Tariff: number;
  Tax: number;
  Grand: number;
  ChangeId: string;
  BranchCode: string;
}

@Component({
  selector: "app-checkin",
  templateUrl: "./checkin.component.html",
  styleUrls: ["./checkin.component.scss"],
  animations: [
    trigger("fadeInOutTranslate", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("400ms ease-in-out", style({ opacity: 1 }))
      ]),
      transition(":leave", [
        style({ transform: "translate(0)" }),
        animate("400ms ease-in-out", style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CheckinComponent implements OnInit {
  NodaysChanged: number = 0;
  form: FormGroup;
  datePickerConfig: Partial<BsDatepickerConfig>;
  timepicker: Partial<TimepickerConfig>;
  planlist = [];
  public data: Observable<any>
  public data1: Observable<any>
  //forms: FormArray = this.formBuilder.array([]);
  model: any = {};
  //simpleOption: Array<IOption> = this.selectOptionService.getCharacters();
  selectedOption = "3";
  isDisabled = true;
  characters: Array<IOption>;
  selectedCharacter = "3";
  timeLeft = 5;
  roomtype = [];
  private dataSub: Subscription = null;
  checkinform: any;
  public navRight: string;
  
  paymentmode: string[] = ["Online", "Credit Card", "Cash"];
  public noofdays: number[] = [];
  foriegnguest: string[] = ["Yes", "No"];
  discounttypes = ["Amount", "%"];
  genderitems: any;
  gender: any;
  pincode: any;
  isSingleCheckin: boolean = true;
  Formcheckin: Checkinss;
  maxDate = new Date();
  myTime = new Date();
  ismeridian: boolean = false;
  CurrentDate: Date;
  valid: boolean = true;
  IsShowloader:boolean=false;
  public rowsOnPage = 12;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  public isShown: boolean = false;
 
  isValid(event: boolean): void {
    this.valid = event;
  }
  gendertypes=[];
  GuestTitle=[];
  GuestTdproof=[];
  arrivalmode=[];
  sourcemode=[];
  Arrivalfrom =[];
  purposeofvisit=[];
  newspaper=[];
  billinginstruction=[];
  howuknow=[];
  Nationlist=[];
  Titlelist=[];
  
  previewUrl:any = null;
  previewUrl2:any = null;
  previewUrl3:any = null;

  constructor(private datePipe: DatePipe,public _masterservice:MasterformService,
    public router: Router,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private roomservice: RoomtypeService,
    private masterservice: MasterformService,public _addressservice:AddressService,
    public selectOptionService: SelectOptionService) {
      

      this.IsShowloader=true;
      //this.data = this._masterservice.GetPinAddress();
      this.data1 = this._masterservice.GetGuestDetails("CW_1001");
      setTimeout(()=>{
       this.IsShowloader=false;
      },5000)
 
      console.log(this.data)
       

      this._masterservice.Getmiscellaneous('Gender').subscribe(data=>{
        this.gendertypes=data;
      })

      this._masterservice.GetAllNation().subscribe(data=>{
        this.Nationlist=data;
      })

      this._masterservice.Getmiscellaneous('Title').subscribe(data=>{
        this.Titlelist=data;
      })

      this._masterservice.Getmiscellaneous('Arrival Mode').subscribe(data=>{
        this.arrivalmode=data;
      })
      this._masterservice.Getmiscellaneous('Source').subscribe(data=>{
        this.sourcemode=data;
      })
  
      this._masterservice.Getmiscellaneous('Purpose of Visit').subscribe(data=>{
        this.purposeofvisit=data;
      })

      this._masterservice.Getmiscellaneous('News Paper').subscribe(data=>{
        this.newspaper=data;
      })

      this._masterservice.Getmiscellaneous('Billing Instruction').subscribe(data=>{
        this.billinginstruction=data;
      })

      this._masterservice.Getmiscellaneous('How Do You Know').subscribe(data=>{
        this.howuknow=data;
      })
  
    
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        dateInputFormat: 'DD/MM/YYYY',
        adaptivePosition: true

      });
    this.maxDate.setDate(this.maxDate.getDate() + 1);
    this.navRight = "nav-off";
    this.timepicker = Object.assign({},
      {
        hourStep: 2,
        minuteStep: 10,
        showMeridian: false,
        //  readonlyInput: false,
        mousewheel: true,
        showMinutes: true,
        showSeconds: false,
        // arrowkeys:true
      });





    this.form = this.formBuilder.group({
      referenceid: ["", [Validators.required]],
      source: ["select", [Validators.required]],
      arivalmode: ["Walk-IN", [Validators.required]],
      title: ["Walk-IN", [Validators.required]],
      booking: ["", [Validators.required]],
      convenience: ["", [Validators.required]],
      guestname: ["", [Validators.required]],
      gender: ["Male", [Validators.required]],
      mobile: ["", [Validators.required]],
      email: ["", [Validators.required]],
      foriegnguest: ["No", [Validators.required]],
      address: ["", [Validators.required]],
      pincode: ["", [Validators.required]],
      city: ["", [Validators.required]],
      state: ["", [Validators.required]],
      nation: ["India", [Validators.required]],
      company: ["", [Validators.required]],
      gstno: ["", [Validators.required]],
      other: this.formBuilder.array([this.AddbokingGrid()]),
      checkindate: [new Date(), [Validators.required]],
      checkintime: [this.myTime, [Validators.required]],
      checkouttime: [this.myTime, [Validators.required]],
      nofdays: ["1", [Validators.required]],
      checkoutdate: [this.maxDate, [Validators.required]],
      selmode: ["Cash", [Validators.required]],
      payamount: ["", [Validators.required]],
      paymntdesc: ["", [Validators.required]],
      disctype: ["select", [Validators.required]],
      applycoupen: ["", [Validators.required]],
      discvalue: ["", [Validators.required]],
      graceperiod: ["", [Validators.required]],
      thumbverification: ["", [Validators.required]],
      GuestPhotoPath:["",[Validators.required]],
      GuestIdFront:["",[Validators.required]],
      GuestIdBack:["",[Validators.required]],
      Arrivalfrom:["",[Validators.required]],
      Proceeding:["",[Validators.required]],
      Vehicle:["",[Validators.required]],
      Bags:["select",[Validators.required]],
      news:["select",[Validators.required]],
      visit:["select",[Validators.required]],
      cometoknow:["select",[Validators.required]],
      Billing:["select",[Validators.required]],
      DOB:["",[Validators.required]],
      DOA:["",[Validators.required]]
    });
  }

  ngOnInit() {

     

    this.masterservice.getplan().subscribe(res => {
      this.planlist = res as [];
      console.log(this.planlist);
    });

    this.roomservice.GetRoomType("CW_1001").subscribe(data => {
      this.roomtype = data as [];
      console.log(this.roomtype);
    });

    if (this.isSingleCheckin == true) {
      console.log(this.form);
      this.masterservice.GetCheckinDetail("101", "CW_1001").subscribe(data => {
        this.checkinform = data;
        console.log(this.checkinform);
        console.log("this.checkinform");
        this.other.patchValue([
          {
            RoomNo: this.checkinform["checkin"].RoomNo,
            RoomCode: this.checkinform["checkin"].RoomCode,
            Pax: this.checkinform["checkin"].Pax,
            PlanName: this.checkinform["checkin"].PlanName,
            Food: this.checkinform["checkin"].Food,
            Tariff: this.checkinform["checkin"].Tariff,
            Tax: this.checkinform["checkin"].Tax,
            Grand: this.checkinform["checkin"].Grand
          }
        ]);
      });
    }

    this.CreateNoofDays(31)


  }

 
  CreateNoofDays(number) {
    for (var i = 1; i <= number; i++) {
      this.noofdays.push(i);
    }
  }

  ChangeCheckoutDate(NoOfDays: number) {
    this.NodaysChanged = NoOfDays;
    // var ddMMyyyy = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    var result = this.datePipe.transform(new Date().getDay() + 2, "dd/MM/yyyy");
    //alert(result)
  }


  get other(): FormArray {
    return this.form.get("other") as FormArray;
  }
  
  openMyPincodeModalData(SelectedData:any,event:any){ 
    this.form.patchValue({
      pincode: SelectedData.Pincode,
      city: SelectedData.AreaData,
      state:SelectedData.State,
      nation:"India",
    }) 
  }

  openMyGuestNameModalData(SelectedData:any,event:any){ 
    console.log('SelectedData')
    console.log(SelectedData)
    this.form.patchValue({
      guestname: SelectedData.GuestName,
      title: SelectedData.GuestTittle,
      gender:SelectedData.Gender,
      address:SelectedData.GuestAddress,
      city: SelectedData.City,
      state:SelectedData.State,
      nation:"India",
      mobile:SelectedData.MobileNo,
      email:SelectedData.Email,
      pincode:SelectedData.PINCode,
      gstno:SelectedData.GSTNO,
      DOB: SelectedData.GDOB,
      DOA: SelectedData.GDOA,

    }) 
   ;
    this.previewUrl=environment.GuestimagePath+"/"+SelectedData.GuestPhotoPath;
    this.previewUrl2=environment.GuestimagePath+"/"+SelectedData.GuestIdFront;
    this.previewUrl3=environment.GuestimagePath+"/"+SelectedData.GuestIdBack;
  }
 

  openMyModalPincode(event, data){
    this.filterQuery="";
    document.querySelector("#" + event).classList.add("md-show");
  }
  openguestnamedetails(event, data)
{
  this.filterQuery="";
  document.querySelector("#" + event).classList.add("md-show");
}

  RoomTypeChanged(index: number, Changed: string) {
    //let dd = this.form.controls[index].get("RoomCode").value;
    this.Formcheckin = {
      RoomCode: this.other.controls[index].get("RoomCode").value,
      RoomNo: this.other.controls[index].get("RoomNo").value,
      Pax: this.other.controls[index].get("Pax").value,
      PlanName: this.other.controls[index].get("PlanName").value,
      Food: this.other.controls[index].get("Food").value,
      Tariff: this.other.controls[index].get("Tariff").value,
      Tax: this.other.controls[index].get("Tax").value,
      Grand: this.other.controls[index].get("Grand").value,
      ChangeId: Changed,
      BranchCode: "CW_1001"
    };

    this.masterservice.GetBookingData(this.Formcheckin).subscribe(data => {
      this.other.controls[index].patchValue({
        RoomNo: data["RoomNo"],
        RoomCode: data["RoomCode"],
        Pax: data["Pax"],
        PlanName: data["PlanName"],
        Food: data["Food"],
        Tariff: data["Tariff"],
        Tax: data["Tax"],
        Grand: data["Grand"]
      });
    });
  }

  Submit() {

    console.log(this.form.value)
  }

  AddbokingGrid(): FormGroup {
    return this.formBuilder.group({
      bankAccountID: ["0"],
      RoomCode: ["0"],
      RoomNo: ["", [Validators.required]],
      Pax: ["2", [Validators.required]],
      PlanName: ["EP", [Validators.required]],
      Food: ["0", [Validators.required]],
      Tariff: ["0", [Validators.required]],
      Tax: ["0", [Validators.required]],
      Grand: [""]
    });
  }







  onDelete(bankAccountID, i) {
    if (i != 0) (<FormArray>this.form.get("other")).removeAt(i);
  }

  AddBokingButtonClick(): void {
    (<FormArray>this.form.get("other")).push(this.AddbokingGrid());
  }

 
  openpincodedetails(event) {
    setTimeout(() => {
      console.log("openpincodedetails calling");
    }, 1000);
    document.querySelector("#" + event).classList.add("md-show");
  }
  opencitydetails(event) {
    setTimeout(() => {
      console.log("opencitydetails calling");
    }, 1000);
    document.querySelector("#" + event).classList.add("md-show");
  }

  openreferencedetails(event) {
    setTimeout(() => {
      console.log("openreferencedetails calling");
    }, 1000);
    document.querySelector("#" + event).classList.add("md-show");
  }
  opencompanydetails(event) {
    setTimeout(() => {
      console.log("compamny calling");
    }, 1000);
    document.querySelector("#" + event).classList.add("md-show");
  }
  openproceedingdetails(event) {
    setTimeout(() => {
      console.log("openprocedingdetails calling");
    }, 1000);
    document.querySelector("#" + event).classList.add("md-show");
  }
  openARdetails(event) {
    setTimeout(() => {
      console.log("openARdetails calling");
    }, 1000);
    document.querySelector("#" + event).classList.add("md-show");
  }

  closeMyModalPin(event) {
    
    event.target.parentElement.parentElement.parentElement.classList.remove(
      "md-show"
    );
  }

  closeMyModal(event) {
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












    // this.form.get('nofdays').valueChanges.subscribe(
    //   data => {   
    //   this.NodaysChanged=data;   
    //   // alert(this.NodaysChanged)
    //   // var result = new Date()
    //   // result.setDate(result.getDate() + this.NodaysChanged);
    //   // alert(result)
    //   var newdate = new Date();
    //   newdate.setDate(newdate.getDate() + this.NodaysChanged);   
    //   var dd = newdate.getDate();
    //   var mm = newdate.getMonth() + 1;
    //   var y = newdate.getFullYear();

    //   var someFormattedDate = dd + '/' + mm + '/' + y;
    //   alert(someFormattedDate)

    //   // this.form.patchValue({
    //   //   pincode: "4",
    //   //   checkoutdate:dd
    //   //   })


    //   }); 