
import { Component, OnDestroy, OnInit, Renderer2, ViewEncapsulation, ViewChild, ElementRef } from "@angular/core";
import { Observable, Observer, empty, fromEvent, pipe, } from "rxjs";
import { NgForm } from "@angular/forms";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn,
  Validators
} from "@angular/forms";
import { HMSReservationFormmodel } from './../../_models/HMSReservationFormmodel';

import { Router, ActivatedRoute } from "@angular/router";
import { CheckinService } from './../../_services/checkin.service';
import { ReservationService } from './../../_services/reservation.service';

//import { Subscription } from "rxjs/Subscription";
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { animate, style, transition, trigger } from "@angular/animations";
import { RoomtypeService } from "./../../_services/roomtype.service";
import { MasterformService } from "src/app/_services/masterform.service";
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { AddressService } from './../../_services/address.service';
import { environment } from 'src/environments/environment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from "@angular/common";
import { BankService } from 'src/app/_services/bank.service';
import { Subject } from 'rxjs/Subject';

import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';

import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
import { filter, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators'

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
  selector: "app-rescheckin",
  templateUrl: "./rescheckin.component.html",
  styleUrls: ["./rescheckin.component.scss"],

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


export class RescheckinComponent implements OnInit, OnDestroy {
  //bankAccountForms: FormArray = this.fb.array([]);
  IsDisableBookindGrid: Boolean;
  addcompanydiv: boolean = false;
  searchresultsdiv: boolean = true;
  addcompanybtn: boolean = true;
  StateList: any;
  selectedRoomcode: any;
  ReferanceList: any;
  subpaymodelist: any;
  golbalresponse: any;
  reservedlist: any;
  TaxHeader: any;
  Reservationform: HMSReservationFormmodel;
  ReservationAmendform: any;
  TotalBillAmount: number;
  TotalPaidAmount: number;
  TotalBalanceAmount: number;
  OrgCompanycode:string;
  IsCompanyReservation:boolean;
  pushInstruction:[]=[];
  //web camara data
  SnapshotbuttonDisabled: boolean;
  camarabuttonDisabled: boolean;
  public snapshotshow = false;
  public OnCamera: string = "OnCamera"
  public Iscamaraon: boolean = false;
  // toggle webcam on/off
  public showWebcam = false;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  error: string;
  base64TrimmedURL: any;
  base64DefaultURL: any;
  generatedImage: any;
  guest: any;
  picodelist: any;
  referencelist: any;
  companylist: any;
  driverlist: any;
  theme = "bootstrap";
  type = "default";
  closeOther = false;
  orgReservationNo: string;
  
  position = 'top-right';
  //public videoOptions: MediaTrackConstraints = {
  // width: {ideal: 1024},
  // height: {ideal: 576}
  //};

  public errors: WebcamInitError[] = [];
  // latest snapshot
  public webcamImage: WebcamImage = null;
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  //web camara data end
  RoomNoArray: string[] = [];
  OriginalArray: string[] = [];
  selectedRoomNoArray: string[] = [];
  NodaysChanged: number = 0;
  form: FormGroup;
  datePickerConfig: Partial<BsDatepickerConfig>;
  timepicker: Partial<TimepickerConfig>;
  planlist = [];
  public data: Observable<any>

  //forms: FormArray = this.formBuilder.array([]);
  model: any = {};
  //simpleOption: Array<IOption> = this.selectOptionService.getCharacters();
  selectedOption = "3";
  isDisabled = true;
  //characters: Array<IOption>;
  selectedCharacter = "3";
  timeLeft = 5;
  roomtype = [];
  companytype: any;
  // private dataSub: Subscription = null;
  checkinform: any;
  public navRight: string;
  paymentmode: string[] = ["Cash", "Card", "Online", "Walet"];
  public noofdays: number[] = [];
  foriegnguest: string[] = ["Yes", "No"];
  discounttypes = ["Amount", "%"];
  genderitems: any;
  gender: any;
  pincode: any;
  IsWalkinCheckin: boolean = true;
  IsCompanyCheckin: boolean = false;
  Formcheckin: Checkinss;
  Groupcheckin: Checkinss[] = [];
  maxDate = new Date();
  myTime = new Date();
  ismeridian: boolean = false;
  changecolor: boolean = true;
  minDate: Date;
  UserId: number;
  valid: boolean = true;
  IsShowloader: boolean = false;
  public rowsOnPage = 12;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  public isShown: boolean = false;
  referanceName: string;
  isValid(event: boolean): void {
    this.valid = event;
  }
  gendertypes = [];
  GuestTitle = [];
  GuestTdproof = [];
  arrivalmode = [];
  sourcemode = [];
  Arrivalfrom = [];
  purposeofvisit = [];
  newspaper = [];
  billinginstruction = [];
  howuknow = [];
  Nationlist = [];
  Titlelist = [];

  previewUrl: any = null;
  previewUrl2: any = null;
  previewUrl3: any = null;
  filterguest: any[];
  filterpin: any[];
  fileDataIdfront: File = null;
  fileDataIdBack: File = null;
  Branch: string;
  private _searchTerm: string;
  private isGorupCheckin: boolean = false;
  public CheckinRoom: string;
  roomNoList: any;
  toggle: boolean = true;
  Process: string;

  fileDataIdfrontSecGuest: File = null;
  fileDataIdBackSecGuest: File = null;

  GuetImg0; GuetImg1; GuetImg2; GuetImg3: any = null;
  GuetIdFront0; GuetIdFront1; GuetIdFront2; GuetIdFront3: any = null;
  GuetIdBack0; GuetIdBack1; GuetIdBack2; GuetIdBack3: any = null;

  @ViewChild('searchTerm', { static: false }) searchTerm: ElementRef;
  @ViewChild('searchTermref', { static: false }) searchTermref: ElementRef;
  @ViewChild('searchTermguest', { static: false }) searchTermguest: ElementRef;
  @ViewChild('searchTermcompany', { static: false }) searchTermcompany: ElementRef;
  @ViewChild('searchTermdriver', { static: false }) searchTermdriver: ElementRef;

  @ViewChild('searchTermPinSec', { static: false }) searchTermPinSec: ElementRef;
  @ViewChild('searchTermguestInsidePopup', { static: false }) searchTermguestInsidePopup: ElementRef;

  public Guestphotopathurl: string;
  public GuestDoucmentFrontpathurl: string = "0";
  public GuestDoucmentBackpathurl: string = "0";
  back = false;
  Id$: Observable<string>;
  @ViewChild('f', { static: false }) newcompanyform: any;
  constructor(private datePipe: DatePipe, private fb: FormBuilder,
    public router: Router, private toastyService: ToastyService, private renderer: Renderer2,
    public formBuilder: FormBuilder, private _bankservice: BankService,
    private route: ActivatedRoute, private _Checkinservice: CheckinService,
    private roomservice: RoomtypeService,
    private confirmationDialogService: ConfirmationDialogService,
    private _masterservice: MasterformService, public _addressservice: AddressService, private _reservationservice: ReservationService,
  ) {

    //this._bankservice.changeMessage("collapsed")
    this.Branch = "CW_1001"
    this.IsShowloader = false;
    this.UserId = 1;
    let ResNo = this.route.snapshot.paramMap.get('ResNo');
    this.orgReservationNo = ResNo;
    this.CheckinRoom = "GROUP";
    this.isGorupCheckin = true;
    this.IsWalkinCheckin = false;
    this.IsDisableBookindGrid = true;
    setTimeout(() => {
      this.IsShowloader = false;
    }, 2000)

    this.minDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 1);

    this.navRight = "nav-off";
    this.timepicker = Object.assign({},
      {
        hourStep: 2,
        minuteStep: 10,
        showMeridian: false,
        // readonlyInput: false,
        mousewheel: true,
        showMinutes: true,
        showSeconds: false,
        // arrowkeys:true
      });

    this.form = this.formBuilder.group({
      companycode: ["0", [Validators.required]],
      Guestcode: ["0", [Validators.required]],
      referenceid: ["0", [Validators.required]],
      source: ["select", [Validators.required]],
      arivalmode: ["Walk-IN", [Validators.required]],
      title: ["Mr", [Validators.required]],
      booking: ["", [Validators.required]],
      convenience: [0, [Validators.required]],
      guestname: ["", [Validators.required]],
      gender: ["Male", [Validators.required]],
      mobile: ["", [Validators.required]],
      email: ["", [Validators.required]],
      foriegnguest: ["No", [Validators.required]],
      address1: ["", [Validators.required]],
      address2: ["", [Validators.required]],
      address3: ["", [Validators.required]],
      Area: ["", [Validators.required]],
      pincode: ["", [Validators.required]],
      city: ["", [Validators.required]],
      state: ["0", [Validators.required]],
      StateCode: [, [Validators.required]],
      nation: ["India", [Validators.required]],
      company: ["", [Validators.required]],
      gstno: ["", [Validators.required]],
      other: this.formBuilder.array([this.AddbokingGrid()]),
      checkindate: [new Date(), [Validators.required]],
      checkintime: [this.myTime, [Validators.required]],
      checkouttime: [this.myTime, [Validators.required]],
      nofdays: ["1", [Validators.required]],
      checkoutdate: [this.maxDate, [Validators.required]],

      disctype: ["select", [Validators.required]],
      applycoupen: ["", [Validators.required]],
      discvalue: ["", [Validators.required]],
      graceperiod: ["", [Validators.required]],
      PayArray: this.formBuilder.array([]),

      GuestPhotoPath: ["", [Validators.required]],
      GuestIdFront: ["", [Validators.required]],
      GuestIdBack: ["", [Validators.required]],
      Arrivalfrom: ["", [Validators.required]],
      Proceeding: ["", [Validators.required]],
      Vehicle: ["", [Validators.required]],
      Bags: ["select", [Validators.required]],
      news: ["select", [Validators.required]],
      visit: ["select", [Validators.required]],
      cometoknow: ["select", [Validators.required]],
      Billing: ["select", [Validators.required]],
      DOB: ["", [Validators.required]],
      DOA: ["", [Validators.required]],
      driverTd: ["", [Validators.required]],
      drivername: ["", [Validators.required]],
      drivermobile: ["", [Validators.required]],
      vehicleno: ["", [Validators.required]],
      charge: ["", [Validators.required]],
      idproof: [""],
      idproofno: [""],
      RefName: [""],
      TaxHeader: ["GST"],
      BranchCode: [this.Branch, [Validators.required]],
      randomCheckinNo: ['0', [Validators.required]],
      IpAdd: [localStorage.getItem("LOCAL_IP")],
      CreatedBy: [localStorage.getItem("id"), [Validators.required]],
      special:[""],
      bankAccountForms:this.formBuilder.array([]),
    });

   
    



  }

  ngOnInit() {

    this.previewUrl = environment.GuestimagePath + '/imagenot.png';
    this.previewUrl2 = environment.GuestimagePath + '/imagenot1.png';
    this.previewUrl3 = environment.GuestimagePath + '/imagenot1.png';
    this.model.Id = 0;
    this.model.CompanyCode = 0;
    this.model.BranchCode = "0";
    this.model.CreatedBy = localStorage.getItem("Id");
    this.searchresultsdiv = true;

    this._masterservice.Getmiscellaneous('TaxHeader').subscribe(data => {
      this.TaxHeader = data;
    })

    this._masterservice.getreferencedetail(this.Branch).subscribe(res => {
      this.ReferanceList = res;
    },
      error => { },
      () => { });
    this.camarabuttonDisabled = false;
    this.SnapshotbuttonDisabled = true;

    this._masterservice.Getmiscellaneous('Gender').subscribe(data => {
      this.gendertypes = data;
    })

    this._masterservice.GetAllNation().subscribe(data => {
      this.Nationlist = data;
    })

    this._masterservice.Getmiscellaneous('Title').subscribe(data => {
      this.Titlelist = data;
    })

    this._masterservice.GetStateCode().subscribe(res => {
      this.StateList = res

    });

    this._masterservice.Getmiscellaneous('Arrival Mode').subscribe(data => {
      this.arrivalmode = data;
    })
    this._masterservice.Getmiscellaneous('Source').subscribe(data => {
      this.sourcemode = data;
    })

    this._masterservice.Getmiscellaneous('Purpose of Visit').subscribe(data => {
      this.purposeofvisit = data;
    })

    this._masterservice.Getmiscellaneous('News Paper').subscribe(data => {
      this.newspaper = data;
    })

    this._masterservice.Getmiscellaneous('Billing Instruction').subscribe(data => {
      this.billinginstruction = data;
    })

    this._masterservice.Getmiscellaneous('How Do You Know').subscribe(data => {
      this.howuknow = data;
    })

   
    this._masterservice.GetAllRoomCompanyType().subscribe(res => {
      this.companytype = res
    });

    this._masterservice.getplan().subscribe(res => {
      this.planlist = res as [];
     
    });

    this.roomservice.GetRoomType("CW_1001").subscribe(data => {
      this.roomtype = data as [];
     
    });

      this.onDelete(0, 0);
      this._reservationservice.GetReservedVacenRoomType(this.orgReservationNo, this.Branch).subscribe((data: any) => {
        this.roomNoList = data;
        console.log(this.roomNoList)
      });
      this._reservationservice.GetReservationCheckin(this.Branch, this.orgReservationNo)
        .subscribe(data => {
          this.reservedlist = data.ReservedRooms;
          console.log(this.reservedlist)
        })
    
    this.CreateNoofDays(31)



    this.OrgCompanycode = "0";
    this.IsCompanyReservation = false;
    this._reservationservice.GetBookingDetailViaRes(this.Branch, this.orgReservationNo).subscribe((res: any) => {
      console.log(res)
      this.ReservationAmendform = res;
      let Guestmodel = this.ReservationAmendform.Guest
      let companymodel = this.ReservationAmendform.company
      let ResMastermodel = this.ReservationAmendform.ResMaster
      let ResAdvance = this.ReservationAmendform.Advance
      let ResExtraCharges = this.ReservationAmendform.ExtraCharges
      this.pushInstruction=this.ReservationAmendform.Special;
      let SpecialInstructionitems=[];
      this.pushInstruction.forEach(x => {
       let data=x;
       SpecialInstructionitems.push(data['Description'])
      
       });

      let ReservationBookedSlaveArray = [];
      var AllreadyBookedType = [];
      let Checkintime, checkoutTime, checkindate, checkoutdate;
      ReservationBookedSlaveArray = this.ReservationAmendform.ResSlave;
      ReservationBookedSlaveArray.forEach(Slave => {
      AllreadyBookedType.push(Slave.RoomCode)
        checkindate=new Date(Slave.CheckinDate)
        checkoutdate=new Date(Slave.CheckoutDate)
      });

      // if (ResExtraCharges != null) {
      //   ResExtraCharges.forEach(res => {
      //     this.GetExtraChargesDetails(res.RevenueId, res.Description, res.Amount, res.Tax, res.NetAmount)
      //   })
      // }
      console.log(Guestmodel)
  
      this.form.patchValue({
        Guestcode: Guestmodel.GuestCode,
        title: Guestmodel.GuestTittle,
        guestname: Guestmodel.GuestName,
        gender: Guestmodel.Gender,
        mobile: Guestmodel.MobileNo,
        email: Guestmodel.Email,
        pincode: Guestmodel.PINCode,
        city: Guestmodel.City,
        state: Guestmodel.State,
        nation: Guestmodel.Nation,
        address1: Guestmodel.Address1,
        address2: Guestmodel.Address2,
        address3: Guestmodel.Address3,
        gstno: Guestmodel.GSTNO,
        Billing: ResMastermodel.BillingMode,
        visit: ResMastermodel.PurposeofVisit,
        source: ResMastermodel.BookingSource,
        arivalmode: "Reservation",
        bookingid: ResMastermodel.BookingId,
        referenceid: ResMastermodel.RefId,
        // checkintime:Checkintime,
        // checkouttime:checkoutTime,
        nofdays: ResMastermodel.NoOfDays,
        checkindate: checkindate,
        checkoutdate: checkoutdate,
        Area: Guestmodel.Area,
        StateCode: Guestmodel.StateCode,
        special:SpecialInstructionitems
        
      })
      if (companymodel != null) {
        this.form.patchValue({
          companycode: companymodel.CompanyCode,
          gstno: companymodel.GSTNO,
          company: companymodel.CompanyName

        })
        this.OrgCompanycode = companymodel.CompanyCode;
        this.IsCompanyReservation = true;
      }
      if (ResAdvance != null) {
        this.TotalPaidAmount=0;
        console.log(ResAdvance)
        console.log('ResAdvance')
        ResAdvance.forEach(res => {
        this.TotalPaidAmount+=res.PaidAmount       
        });

      }
      let reservation = new HMSReservationFormmodel()
      {
        reservation.CheckInDate = checkindate;
        reservation.CheckOutDate = checkindate;
        reservation.ArrivalTime = this.datePipe.transform(this.form.get('checkintime').value, "HH:mm");
        reservation.DepartureTime = this.datePipe.transform(this.form.get('checkouttime').value, "HH:mm")
        reservation.NoDays = ResMastermodel.NoOfDays;
        reservation.BranchCode = this.Branch;
        reservation.BookedRoomCodelist = JSON.stringify(AllreadyBookedType);
        reservation.TypeBook = "ResCheckin";
        reservation.ReservNo = this.orgReservationNo;
      }   
    });
  }





  GetStateCode(StateName:string)
  {
    let Cons = this.StateList.filter(x => x.State == StateName);  
    this.form.patchValue({
      StateCode: Cons[0].StateCode
     })
  
  }



  CalculateSummaryAmount() {
    this.TotalBillAmount=0;
    this.TotalPaidAmount=0; 
    this.TotalBalanceAmount=0; 
   
   
      for (let Payarray of this.PayArray.controls) {
        this.TotalPaidAmount += Payarray.get("payAmount").value;
      }
      for (let other of this.other.controls) {       
          this.TotalBillAmount += other.get("Grand").value;    
      } 
      this.TotalBalanceAmount = this.TotalBillAmount - this.TotalPaidAmount;
    
 
  }



  removeRoomNo(RoomNo: string): void {

    for (let order of this.selectedRoomNoArray) {
      let match = this.selectedRoomNoArray.filter((order) => order == RoomNo);
      match ? this.selectedRoomNoArray.splice(this.selectedRoomNoArray.indexOf(order), 1) : null;
      break;
    }
    console.log(this.selectedRoomNoArray);
  }

  ngOnDestroy() {
    this.showWebcam = false;
    //this._bankservice.changeMessage("expanded")
  }

  CheckRoom(RoomCodes: string): number {
    let relen = this.reservedlist.length;
    for (let j = 0; j < relen; j++) {
      if (RoomCodes === this.reservedlist[j].RoomCode) {
        var req = this.reservedlist[j].TotalBookedRoom;
        var selected = 0;
        for (var i = 0; i < this.other.length; i++) {
          let rcode = this.other.controls[i].get("RoomCode").value;
          if (rcode === this.reservedlist[j].RoomCode) {
            selected += 1;
          }
        }
        if (selected <= req) {
          return 1;
        }
        else {
          return 0;
        }
      }
    }
  }

  ReservationButtonClick(event, RoomNos, RoomCodes, RoomNo) {
    debugger;
    const classNameS = event.target.className;
    if (classNameS.indexOf('freeroom') >= 0) {
      document.querySelector("#" + RoomNos).classList.remove('freeroom');
      document.querySelector("#" + RoomNos).classList.add('occroom');
      this.selectedRoomNoArray.push(RoomNo)
      this.RoomNoArray = [];
      this.RoomNoArray.push(RoomNo)
      var bok = this.RoomNoArray;
      let convertlist = [];
      convertlist.push(bok)
      this.golbalresponse = convertlist;
      this._Checkinservice.GetReservationBookingDetails(this.golbalresponse,RoomCodes, this.Branch,this.orgReservationNo).subscribe((data) => {
        this.golbalresponse = data;
        console.log(this.golbalresponse)      
        this.IsDisableBookindGrid = false;
      },
        error => {
          console.log(error.message);
        },
        () => {
          console.log("BookingData fetched sucssesfully.");

          this.Groupcheckin = this.golbalresponse.checkin;
          console.log('this.Groupcheckin')
          console.log(this.Groupcheckin)
          this.AddBokingButtonviaForeach(this.Groupcheckin)
          // for (let groupdata of this.Groupcheckin) {
          //   this.AddBokingButtonviaForeach(groupdata)
          // }
          let Count = this.CheckRoom(RoomCodes);
          if (Count == 0)
           {
            var Warning = "Not Allowed to book! Already you Selected"
            this.addToast("Cogwave Software", Warning, "warning");
            document.querySelector("#" + RoomNos).classList.remove('occroom');
            document.querySelector("#" + RoomNos).classList.add('freeroom');
            let index = this.selectedRoomNoArray.indexOf(RoomNo);
            this.selectedRoomNoArray.splice(index);
            this.onDelete(0, index);
          }
          this.CalculateSummaryAmount();
        });
    }
    else {
      document.querySelector("#" + RoomNos).classList.remove('occroom');
      document.querySelector("#" + RoomNos).classList.add('freeroom');
      let index = this.selectedRoomNoArray.indexOf(RoomNo);
      this.selectedRoomNoArray.splice(index);
      this.onDelete(0, index);
      this.CalculateSummaryAmount();
    }
   
  }






  AddBokingButtonviaForeach(groupdata: any): void {
    (<FormArray>this.form.get("other")).push(this.AddbokingGridviaForeach(groupdata));
  }

  AddbokingGridviaForeach(groupdata): FormGroup {

    console.log('groupdata')
    console.log(groupdata)

    return this.formBuilder.group({
      bankAccountID: [],
      RoomCode: [groupdata.RoomCode],
      RoomNo: [groupdata.RoomNo, [Validators.required]],
      Pax: [groupdata.Pax, [Validators.required]],
      PlanName: ["EP", [Validators.required]],
      Food: [groupdata.Food, [Validators.required]],
      Tariff: [groupdata.Tariff, [Validators.required]],
      Tax: [groupdata.Tax, [Validators.required]],
      Grand: [groupdata.Grand, [Validators.required]],
      // Net: [groupdata.Net, [Validators.required]],
      disctype: [groupdata.disType],
      discvalue: [groupdata.disValue]
    });
  }


  public CompanyCheckin(id: string) {

    this._masterservice.GetCompanyTariffDetail(this.CheckinRoom, this.Branch, id)
      .subscribe(result => {
        this.checkinform = result;
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
      })


  }

  public triggerSnapshot(): void {
    this.trigger.next();
    this.toggleWebcam();
    //this.Iscamaraon = true;
    this.SnapshotbuttonDisabled = true;
    this.camarabuttonDisabled = false;
  }

  public SwitchOnCamara() {
    this.SnapshotbuttonDisabled = false;
    this.camarabuttonDisabled = true;

    if (this.showWebcam) {
      this.snapshotshow = true;
    }
    else {
      this.snapshotshow = false;
    }
    this.showWebcam = !this.showWebcam;

  }

  FilterPaymentMode(index: number) {
    let mode = this.PayArray.controls[index].get("Paymode").value;
    switch (mode) {
      case "Cash":
        this.subpaymodelist = [];
        this.subpaymodelist.push("Cash")
        //this.GetsubModepayment("Cash")
        break;
      case "Card":
        this.GetsubModepayment("Card", index)
        break;
      case "Online":
        this.GetsubModepayment("Online", index)
        break;
      case "Cheque":
        this.subpaymodelist = [];
        //this.GetsubModepayment("Cheque")
        this.subpaymodelist.push("DD", index)
        break;
      case "Walet":
        this.GetsubModepayment("Walet", index)
        break;
    }
  }



  ngAfterViewInit() {
    // server-side search
   

    fromEvent(this.searchTermguest.nativeElement, 'keyup')
      .pipe(
        filter(text => this.searchTermguest.nativeElement.value.length > 2),
        debounceTime(1000),
        distinctUntilChanged(),
        // tap(x=>console.log('from tap' + x)),
        switchMap(id => {
          //console.log(id)
          console.log('guestmap')
          return this._masterservice.GuetDataSearch(this.Branch, this.searchTermguest.nativeElement.value);
        })
      ).subscribe(res => this.guest = res);


    fromEvent(this.searchTerm.nativeElement, 'keyup')
      .pipe(
        filter(text => this.searchTerm.nativeElement.value.length > 2),
        debounceTime(1000),
        distinctUntilChanged(),
        // tap(x=>console.log('from tap' + x)),
        switchMap(id => {
          //console.log(id)
          console.log('switchMap')
          return this._masterservice.SearchGuestAddress(this.searchTerm.nativeElement.value);
        })
      ).subscribe(res => this.picodelist = res);


    fromEvent(this.searchTermref.nativeElement, 'keyup')
      .pipe(
        filter(text => this.searchTermref.nativeElement.value.length > 2),
        debounceTime(1000),
        distinctUntilChanged(),
        // tap(x=>console.log('from tap' + x)),
        switchMap(id => {
          //console.log(id)

          return this._masterservice.SearchReferance(this.Branch, this.searchTermref.nativeElement.value);
        })
      ).subscribe(res => this.referencelist = res);



    fromEvent(this.searchTermcompany.nativeElement, 'keyup')
      .pipe(
        filter(text => this.searchTermcompany.nativeElement.value.length > 2),
        debounceTime(1000),
        distinctUntilChanged(),
        // tap(x=>console.log('from tap' + x)),
        switchMap(id => {
          //console.log(id)

          return this._masterservice.SearchComanyDate(this.Branch, this.searchTermcompany.nativeElement.value);
        })
      ).subscribe(res => {
        this.companylist = res;
        console.log(this.companylist)
      });


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


      fromEvent(this.searchTermPinSec.nativeElement, 'keyup')
      .pipe(
        filter(text => this.searchTermPinSec.nativeElement.value.length > 2),
        debounceTime(1000),
        distinctUntilChanged(),
        // tap(x=>console.log('from tap' + x)),
        switchMap(id => {
          //console.log(id)
          console.log('switchMap')
          return this._masterservice.SearchGuestAddress(this.searchTermPinSec.nativeElement.value);
        })
      ).subscribe(res => this.picodelist = res);



      
    fromEvent(this.searchTermguestInsidePopup.nativeElement, 'keyup')
    .pipe(
      filter(text => this.searchTermguestInsidePopup.nativeElement.value.length > 2),
      debounceTime(1000),
      distinctUntilChanged(),
      // tap(x=>console.log('from tap' + x)),
      switchMap(id => {
        //console.log(id)
        console.log('guestmap')
        return this._masterservice.GuetDataSearch(this.Branch, this.searchTermguestInsidePopup.nativeElement.value);
      })
    ).subscribe(res => this.guest = res);



  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
    this.snapshotshow = true;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.previewUrl = webcamImage.imageAsDataUrl
    this.getImage(webcamImage.imageAsBase64)

  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }


  getImage(url) {

    // Base64 url of image trimmed one without data:image/png;base64
    this.base64DefaultURL = url;
    // Naming the image
    const date = new Date().valueOf();
    let text = '';
    const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
    }
    // Replace extension according to your media type
    const imageName = date + '_' + text + '.png';
    // call method that creates a blob from dataUri
    //const imageBlob = this.dataURItoBlob(this.base64DefaultURL);
    const formData = new FormData();
    let imageBlob;
    this.dataURItoBlob(this.base64DefaultURL).subscribe(data => {
      imageBlob = data;
      const imageFile = new File([imageBlob], imageName, { type: 'image/png' });
      formData.append('GuestPohto', imageFile, imageName);
    });
    this._masterservice.SavaImsData(formData)
      .subscribe(res => {
        console.log(imageName);
        this.Guestphotopathurl = imageName;
        console.log(res);

      },
        error => {
          // alert('e')
          console.log(error);
        },
        () => {

        });
  }

  dataURItoBlob(dataURI): Observable<Blob> {
    return Observable.create((observer: Observer<Blob>) => {
      const byteString = window.atob(dataURI);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: 'image/jpeg' });
      observer.next(blob);
      observer.complete();
    });
  }

  CreateNoofDays(number) {
    for (var i = 1; i <= number; i++) {
      this.noofdays.push(i);
    }
  }

  ChangeCheckoutDate(NoOfDays) {
    //this.NodaysChanged = NoOfDays;
    // var ddMMyyyy = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    //var result = this.datePipe.transform(new Date().getDay() + 2, "dd/MM/yyyy");

    this.minDate = new Date();
    this.maxDate.setDate(this.minDate.getDate() + parseInt(NoOfDays));
    var result = this.datePipe.transform(this.maxDate, "dd/MM/yyyy");
    this.form.patchValue({
      checkoutdate: result
    })

  }


  get other(): FormArray {
    return this.form.get("other") as FormArray;
  }


  get PayArray(): FormArray {
    return this.form.get("PayArray") as FormArray;
  }

  get bankAccountForms(): FormArray {
    return this.form.get("bankAccountForms") as FormArray;
  } 

  openMyPincodeModalData(SelectedData: any, event: any) {
    this.form.patchValue({
      pincode: SelectedData.Pincode,
      Area: SelectedData.AreaData,
      city: SelectedData.City,
      state: SelectedData.State,
      nation: "India",
    })
    var allbtn = document.querySelector('.md-show');
    console.log(allbtn);
    allbtn.classList.remove("md-show");
  }

  patchPincodeModalData(SelectedData: any, event: any) {
    let IndexFormObs;
    this._bankservice.currentindex.subscribe(res=>{
      IndexFormObs=res;
    })
    let Cons = this.StateList.filter(x => x.State == SelectedData.State);
    this.bankAccountForms.controls[IndexFormObs].patchValue({
      pincode: SelectedData.Pincode,
      city: SelectedData.City,
      state: SelectedData.State,
      Area:SelectedData.AreaData,
      nation: "India",
      StateCode: Cons[0].StateCode
    })
   
  }

  PatchSubModeName(index: number) {
    let DescriptionMode = this.PayArray.controls[index].get("Paysubmode").value;
    this.PayArray.controls[index].patchValue({
      modeselected: DescriptionMode
    })

    this.PayArray.controls[index].get("modeselected").disable({ onlySelf: true });
  }

  GetsubModepayment(Name: string, index: number) {

    this._masterservice.GetAllSubPaymendModeViaMode(this.Branch, Name).subscribe(res => {
      this.subpaymodelist = res
    })

  }

  OpencompanymodelsDetail(SelectedData: any, event: any) {
    this.form.patchValue({
      company: SelectedData.CompanyName,
      gstno: SelectedData.GSTNO,
      companycode: SelectedData.CompanyCode
    })
    this.IsWalkinCheckin = false;
    this.IsCompanyCheckin = true;
    this.CompanyCheckin(SelectedData.CompanyCode);
  }


  OpenDrivermodelsDetail(SelectedData: any, event: any) {
    this.form.patchValue({
      driverTd: SelectedData.DriverId,
      drivername: SelectedData.DriverName,
      drivermobile: SelectedData.MobileNo,
      vehicleno: SelectedData.VechileNo,
      charge: SelectedData.ChargeAmount,
    })
  }



  ReferanceModelOpen(event, data) {
    this.referanceName = '';

    document.querySelector("#" + event).classList.add("md-show");
  }

  PatchReferance(SelectedData: any, event: any) {
    this.form.patchValue({
      referenceid: SelectedData.Id,
      RefName: SelectedData.RefName
    })
    this.form.get('RefName').disable({ onlySelf: true });
    this.referanceName = SelectedData.RefName;
    var allbtn = document.querySelector('.md-show');
    allbtn.classList.remove("md-show");
  }

  ReferanceSave(form?: NgForm) {
    debugger;
    form.value.BranchCode = this.Branch;
    form.value.CreatedBy = localStorage.getItem("id");
    form.value.IsActive = true;
    form.value.RefAdress = "0";
    form.value.RefPoints = 0;
    console.log(form.value);
    if (form.invalid) {
      console.log(form.value);
      this.addToast("Cogwave Software", "invalid Data", "warning");
      return;
    }
    this._masterservice.SaveReferance(form.value).subscribe(data => {
      if (data == true) {
        if (form.value.Id == "0") {
          this.addToast(
            "Cogwave Software",
            " Referance Saved Sucessfully",
            "success"
          );
          this.searchresultsdiv = true;
          this.addcompanydiv = false;
          this.addcompanybtn = true;
          this.ReferanceModelOpen('effect-6', data)
        }

      }
      else {
        this.addToast("Cogwave Software", "Referance Data Not Saved", "error");
      }
    });
    console.log(form.value);
  }



  openMyGuestNameModalData(SelectedData: any, event: any) {
    console.log('SelectedData')
    console.log(SelectedData)
    this.form.patchValue({
      Guestcode: SelectedData.GuestCode,
      guestname: SelectedData.GuestName,
      title: SelectedData.GuestTittle,
      gender: SelectedData.Gender,
      address: SelectedData.GuestAddress,
      city: SelectedData.City,
      state: SelectedData.State,
      nation: "India",
      mobile: SelectedData.MobileNo,
      email: SelectedData.Email,
      pincode: SelectedData.PINCode,
      gstno: SelectedData.GSTNO,
      DOB: SelectedData.GDOB,
      DOA: SelectedData.GDOA,
    });
    this.form.get('guestname').disable({ onlySelf: true });
    this.snapshotshow = true;
    this.Guestphotopathurl = SelectedData.GuestPhotoPath;
    this.GuestDoucmentFrontpathurl = SelectedData.GuestIdFront;
    this.GuestDoucmentBackpathurl = SelectedData.GuestIdBack;

    this.previewUrl = environment.GuestimagePath + "/" + SelectedData.GuestPhotoPath;
    this.previewUrl2 = environment.GuestimagePath + "/" + SelectedData.GuestIdFront;
    this.previewUrl3 = environment.GuestimagePath + "/" + SelectedData.GuestIdBack;



    var allbtn = document.querySelector('.md-show');
    console.log(allbtn);
    allbtn.classList.remove("md-show");
    //console.log("image name with path"+ this.imagePath1);

  }


  openMyModalPincode(event, data) {
    this.filterQuery = "";
    document.querySelector("#" + event).classList.add("md-show");
  }
  OpenGuestMosel(event, data) {
    this.filterQuery = "";
    document.querySelector("#" + event).classList.add("md-show");
  }




  Opencompanymodel(event, data) {
    this.filterQuery = "";
    document.querySelector("#" + event).classList.add("md-show");
  }

  Opendrivermodel(event, data) {
    this.filterQuery = "";
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
      BranchCode: this.Branch
    };

    this._masterservice.GetBookingData(this.Formcheckin).subscribe(data => {
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

  fileProgressIdfFront(fileInput: any) {
    this.fileDataIdfront = <File>fileInput.target.files[0];
    this.preview2();
  }


  preview2() {
    var mimeType = this.fileDataIdfront.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileDataIdfront);
    reader.onload = (_event) => {
      this.previewUrl2 = reader.result;
    }
  }

  fileProgressIdfback(fileInput: any) {

    this.fileDataIdBack = <File>fileInput.target.files[0];
    this.preview3();
  }

  preview3() {

    var mimeType = this.fileDataIdBack.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileDataIdBack);
    reader.onload = (_event) => {
      this.previewUrl3 = reader.result;
    }
  }

  Submit() {

    const randomCheckinNo = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let text1 = '';
    for (let i = 0; i < 5; i++) {
      text1 += randomCheckinNo.charAt(Math.floor(Math.random() * randomCheckinNo.length));
    }
    this.form.value.randomCheckinNo = text1;
    this.form.value.BranchCode = localStorage.getItem("BranchCode")
    this.form.value.CreatedBy = localStorage.getItem("id")
    this.form.value.IpAdd = localStorage.getItem("LOCAL_IP")
    console.log(this.form.value)

    this.confirmationDialogService.confirm('Please confirm ..', 'Do you really want to Save Checkin ... ?')
      .then((confirmed) => {
        console.log('User confirmed:', confirmed)
        if (confirmed === true) {
          const formData = new FormData();
          console.log(this.GuestDoucmentFrontpathurl);
          let Idfront = "";
          let Idback = "";
          let FileUploaded = 0;
          if (this.GuestDoucmentFrontpathurl == "0") {
            if (this.fileDataIdfront != null) {
              FileUploaded = 1;
              var timerandom1 = this.datePipe.transform(new Date(), "ddMMyymmss");
              var Rans1 = +timerandom1 * Math.floor(Math.random() * (99999 - 10000)) + 10000;
              Idfront = 'CW_1001' + '_' + Rans1.toString() + "front" + '.png'
              formData.append('GuestIdFront', this.fileDataIdfront, Idfront);
            }
          }
          if (this.GuestDoucmentBackpathurl == "0") {
            if (this.fileDataIdBack != null) {
              FileUploaded = 2;
              var timerandom = this.datePipe.transform(new Date(), "ddMMyymmss");
              var Rans = +timerandom * Math.floor(Math.random() * (99999 - 10000)) + 10000;
              Idback = 'CW_1001' + '_' + Rans.toString() + "GuestPhoto" + '.png'
              formData.append('GuestIdBack', this.fileDataIdBack, Idback);
            }
          }
          this.form.value.RefName = "0";

          if (this.form.value.DOB != "") {
            this.form.value.DOB = this.datePipe.transform(this.form.value.DOB, "MM/dd/yyyy");
          }
          if (this.form.value.DOA != "") {
            this.form.value.DOA = this.datePipe.transform(this.form.value.DOA, "MM/dd/yyyy");
          }

          var checkoutDates = '';
          let cku = this.form.value.checkoutdate;
          console.log(cku)


          if (cku.length == 10) {
            this.form.value.checkoutdate = cku;
            console.log(this.form.value.checkoutdate)
          }
          else {
            checkoutDates = this.datePipe.transform(this.form.value.checkoutdate, "MM/dd/yyyy");
            this.form.value.checkoutdate = checkoutDates;
          }

          this.form.value.checkindate = this.datePipe.transform(this.form.value.checkindate, "MM/dd/yyyy");
          this.form.value.checkintime = this.datePipe.transform(this.form.value.checkintime, "HH:mm");
          this.form.value.checkouttime = this.datePipe.transform(this.form.value.checkouttime, "HH:mm");
          this.form.value.GuestIdFront = this.GuestDoucmentFrontpathurl;
          this.form.value.GuestIdBack = this.GuestDoucmentBackpathurl;
          this.form.value.GuestPhotoPath = this.Guestphotopathurl;
          if (FileUploaded > 0) {
            this._masterservice.SavaImsData(formData)
              .subscribe(res => {
                console.log(res);
                this.GuestDoucmentFrontpathurl = Idfront;
                this.GuestDoucmentBackpathurl = Idback;
                this.form.value.GuestIdFront = this.GuestDoucmentFrontpathurl;
                this.form.value.GuestIdBack = this.GuestDoucmentBackpathurl;
                this.form.value.GuestPhotoPath = this.Guestphotopathurl;
                this._Checkinservice.SaveCheckinData(this.form.value)
                  .subscribe(res => {
                    console.log(res);
                  },
                    error => {
                      this.error = "Checkin Data Not Save";
                      this.addToast("Cogwave Software??", this.error + "??", "error");
                      return;
                    },
                    () => {
                      this.addToast("Cogwave Software", "Checkin Saved Sucessfully", "success");
                    });
              },
                error => {
                  this.error = "Image Guest Not Saved";
                  this.addToast("Cogwave Software??", this.error + "??", "error");
                  return;
                },
                () => {
                  this.router.navigate(["/Master/dashboard"]);
                });

          }
          else // no doucment selected while checkin
          {
            this._Checkinservice.SaveCheckinData(this.form.value)
              .subscribe(res => {
                console.log(res);
              },
                error => {
                  this.error = "Checkin Data Not Save";
                  this.addToast("Cogwave Software??", this.error + "??", "error");
                  return;
                },
                () => {
                  this.addToast("Cogwave Software", "Checkin Saved Sucessfully", "success");
                  this.router.navigate(["/Master/dashboard"]);
                });
          }

        }//confoirmtrue end
        else {
        }
      })
      .catch(() => {
        alert('cach')
        console.log('e.g., by using ESC, clicking the cross icon, or clicking outside the dialog')
      });

  }



  AddbokingGrid(): FormGroup {
    if (this.isGorupCheckin === false) {

      return this.formBuilder.group({
        bankAccountID: ["0"],
        RoomCode: ["0", [Validators.required]],
        RoomNo: ["0", [Validators.required]],
        Pax: ["2", [Validators.required]],
        PlanName: ["EP", [Validators.required]],
        Food: ["0", [Validators.required]],
        Tariff: ["0", [Validators.required]],
        Tax: ["0", [Validators.required]],
        Grand: [""],
        disctype: ["select"],
        discvalue: ["0"]
      });
    }

  }



  AddpaymentGrid(): FormGroup {
    return this.formBuilder.group({
      Paymode: ["select"],
      Paysubmode: ["select", [Validators.required]],
      payAmount: [0, [Validators.required]],
      Descriptions: ["0"],
      modeselected: ["0"]
    });
  }

  onSubmitcompany(f?: NgForm) {
    debugger;
    f.value.BranchCode = this.Branch;
    f.value.CreatedBy = this.UserId;
    f.value.Id = 0;
    f.value.IpAdd = "0"
    f.value.IsActive = true;

    if (f.invalid) {
      console.log(f.value);
      this.addToast("Cogwave Software", "invalid Data", "warning");
      return;
    }
    this._masterservice.SaveCompanyMinData(f.value).subscribe(data => {
      if (data == true) {
        if (f.value.Id == "0") {
          this.addToast(
            "Cogwave Software",
            "Company Data Saved Sucessfully",
            "success"
          );
          this.searchresultsdiv = true;
          this.addcompanydiv = false;
          this.addcompanybtn = true;
          this.Opencompanymodel('effect-7', data)
        }

      }
      else {
        this.addToast("Cogwave Software", "Company Data Not Saved", "error");
      }
    });
    console.log(f.value);
  }



  addToast(title, Message, theme) {

    this.toastyService.clearAll();
    const toastOptions: ToastOptions = {
      title: title,
      msg: Message,
      showClose: false,
      timeout: 5000,
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



  onDelete(bankAccountID, i) {
    (<FormArray>this.form.get("other")).removeAt(i);
  }

  AddBokingButtonClick(): void {
    (<FormArray>this.form.get("other")).push(this.AddbokingGrid());
  }

  DeleteSecoundaryGuest(i) {
    
    (<FormArray>this.form.get("bankAccountForms")).removeAt(i);
   
  }


  AddPaymentButtonClick(): void {

    (<FormArray>this.form.get("PayArray")).push(this.AddpaymentGrid());
  }

  addcompanyinmodel() {
    this.companylist = [];
    this.addcompanydiv = true;
    //this.searchresultsdiv = false;
    this.addcompanybtn = false;
    console.log("clock");

  }
  printPage() {
    window.print();
  }
  backtosearch() {

    //this.searchresultsdiv = true;
    this.addcompanydiv = false;
    this.addcompanybtn = true;
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

PatchStateCode(StateName: string,index:number) {
 alert(index)
  let Cons = this.StateList.filter(x => x.State == StateName);
  this.bankAccountForms.controls[index].patchValue({
    StateCode: Cons[0].StateCode
  })
}

  
  onDeleteAccountForm(i) {
    (<FormArray>this.form.get("bankAccountForms")).removeAt(i);
  }


  addBankAccountForm(index: number) {
    
    let index1 = this.bankAccountForms.length;
    this.LoadDummyImage(index1)
    if (index1 <= 2) {
      this.bankAccountForms.push(this.fb.group({
        guestname: ['', ""],
        SGuestCode: ['0'],
        title: ["select", ""],
        gender: ["select", ""],
        mobile: ["", ""],
        email: ["", ""],
        pincode: ["", ""],
        city: ["", ""],
        state: ["", ""],
        nation: ["", ""],
        gstno: ["", ""],
        address1: ["", ""],
        address2: ["", ""],
        address3: ["", ""],
        GuestIdFront: ["", ""],
        GuestIdBack: ["", ""],
        GuestImage: ["", ""],
        GuestIdFronturl: ["", ""],
        GuestIdBackurl: ["", ""],
        Area: ["", ""],
        StateCode: ["", ""]
      }));
    }
    else {
      
    // this.previewUrl = environment.GuestimagePath + '/imagenot.png';
    // this.previewUrl2 = environment.GuestimagePath + '/imagenot1.png';
    // this.previewUrl3 = environment.GuestimagePath + '/imagenot1.png';
      alert('NOT ALLOWED')
    }

  }
 
  checkValue(event: any, index: number) {
   
    if (event.target.checked == true) {
      this.SwipeDataFromPrimaryGuest(index)
    }
    else {
         this.RemoveData(index)
    }
  }

LoadDummyImage(index:number)
{
  
  if(index==0)
  {
    this.GuetImg0 = environment.GuestimagePath + '/imagenot1.png';
    this.GuetIdFront0 = environment.GuestimagePath + '/imagenot1.png';
    this.GuetIdBack0 = environment.GuestimagePath + '/imagenot1.png';
  }
  if(index==1)
  {
    this.GuetImg1 = environment.GuestimagePath + '/imagenot1.png';
    this.GuetIdFront1 = environment.GuestimagePath + '/imagenot1.png';
    this.GuetIdBack1 = environment.GuestimagePath + '/imagenot1.png';
  }
  if(index==2)
  {
    this.GuetImg2 = environment.GuestimagePath + '/imagenot1.png';
    this.GuetIdFront2 = environment.GuestimagePath + '/imagenot1.png';
    this.GuetIdBack2 = environment.GuestimagePath + '/imagenot1.png';
  }

 
  

}

  RemoveData(index) {

    this.bankAccountForms.controls[index].patchValue({
      address1: "",
      address2: "",
      address3: "",
      pincode: "",
      city: "",
      state: "",
      nation: "",
      gstno: "",
      company: ""
    })
  }



  SwipeDataFromPrimaryGuest(index) {
    let address1 = this.form.get("address1").value;
    let address2 = this.form.get("address2").value;
    let address3 = this.form.get("address3").value;
    let pincode = this.form.get("pincode").value;
    let city = this.form.get("city").value;
    let state = this.form.get("state").value;
    let nation = this.form.get("nation").value;
    let company = this.form.get("company").value;
    let gstno = this.form.get("gstno").value;

    this.bankAccountForms.controls[index].patchValue({
      address1: address1,
      address2: address2,
      address3: address3,
      pincode: pincode,
      city: city,
      state: state,
      nation: nation,
      gstno: gstno,
      company: company
    })
  }



  OpenAdditionalGuest(event) {
    document.querySelector("#" + event).classList.add("md-show");
  }
  closemodel($event) {
    var allbtn = document.querySelector('.camwindow');
    console.log(allbtn);
    allbtn.classList.remove("md-show");
  }
  onRatingClicked(event: any): void {
    this._bankservice.currentindex.subscribe(re => {
      let liveindex = re;

      switch (liveindex) {
        case 0:
          this.GuetImg0 = environment.GuestimagePath + "/" + event;
          break;
        case 1:
          this.GuetImg1 = environment.GuestimagePath + "/" + event;
          break;
        case 2:
          this.GuetImg2 = environment.GuestimagePath + "/" + event;
          break;
        case 3:
          this.GuetImg3 = environment.GuestimagePath + "/" + event;
          break;

      }

    })
  }




  fileProgressIdfFrontSecGuest(fileInput: any, index: number, Pic: string) {
    this.Process = "";
    debugger
    if (Pic == "Front") {
      this.fileDataIdfrontSecGuest = <File>fileInput.target.files[0];

    }
    else {
      this.fileDataIdBackSecGuest = <File>fileInput.target.files[0];
    }
    this.Process = "Please Wait..";
    this.previewSecGuest(index, Pic);
    this.UplodaImageData(index);
  }

  previewSecGuest(index: number, Pic: string) {

    if (Pic == "Front") {
      var mimeType = this.fileDataIdfrontSecGuest.type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(this.fileDataIdfrontSecGuest);
      //const canvas=document.getElementById('canvas');
      // const context=canvas.getContext("2d");
      reader.onload = (_event) => {

        if (index == 0) {
          this.GuetIdFront0 = reader.result;
        }
        else if (index == 1) {
          this.GuetIdFront1 = reader.result;
        }
        else if (index == 2) {
          this.GuetIdFront2 = reader.result;
        }

      }
    }
    else {
      alert(Pic)
      var mimeType = this.fileDataIdBackSecGuest.type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(this.fileDataIdBackSecGuest);
      reader.onload = (_event) => {
        if (index == 0) {
          this.GuetIdBack0 = reader.result;
        }
        else if (index == 1) {
          this.GuetIdBack1 = reader.result;
        }
        else if (index == 2) {
          this.GuetIdBack2 = reader.result;
        }
      }
    }


  }



  UplodaImageData(index) {
    debugger;
    this.Process = "Wait Image Uploading..."
    const formData = new FormData();
    let Idfront = "";
    let Idback = "";
    if (this.fileDataIdfrontSecGuest != null) {

      var timerandom1 = this.datePipe.transform(new Date(), "ddMMyymmss");
      var Rans1 = +timerandom1 * Math.floor(Math.random() * (99999 - 10000)) + 10000;
      Idfront = 'CW_1001' + '_' + Rans1.toString() + "Front" + '.png'
      formData.append('GuestIdFront', this.fileDataIdfrontSecGuest, Idfront);
    }


    if (this.fileDataIdBackSecGuest != null) {

      var timerandom = this.datePipe.transform(new Date(), "ddMMyymmss");
      var Rans = +timerandom * Math.floor(Math.random() * (99999 - 10000)) + 10000;
      Idback = 'CW_1001' + '_' + Rans.toString() + "Back" + '.png'
      formData.append('GuestIdBack', this.fileDataIdBackSecGuest, Idback);
    }

    this._masterservice.SavaImsData(formData)
      .subscribe(res => {
        this.Process = "Wait Image Uploading 50%..."

      },
        error => {
          this.Process = "Upload Failed Please Try again"
        },
        () => {
          debugger;
          this.bankAccountForms.controls[index].patchValue({
            GuestIdFronturl: Idfront,
            GuestIdBackurl: Idback
          });
          this.Process = "Image Uploaded Successfully"
        });


  }


  OpenCameraDetails(event, index) {
    // this.SendIndexToChild=index;
    // this._bankservice.changeindexvalue(index);
    document.querySelector("#" + event).classList.add("md-show");
  }
  openMyModalPincodePopup(event, data,j) {
    this._bankservice.changeindexvalue(j);
    this.filterQuery = "";
    document.querySelector("#" + event).classList.add("md-show");
  }
  popinsidepopforguestnamefunc(event, data) {
    document.querySelector("#" + event).classList.add("md-show");
  }
}


