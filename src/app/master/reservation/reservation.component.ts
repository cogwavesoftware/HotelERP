
import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, ElementRef } from "@angular/core";
import { Observable, Observer, empty } from "rxjs";
import { NgForm } from "@angular/forms";
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { CheckinService } from './../../_services/checkin.service';
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
import { fromEvent } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
import { filter, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators'
import { Availabilitymodel } from './../../_models/Availabilitymodel';
import { ReservationService } from './../../_services/reservation.service';
import { HMSReservationFormmodel, HMSReservationBookingmodel } from './../../_models/HMSReservationFormmodel'


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
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

export class ReservationComponent implements OnInit, OnDestroy {

  IsCompanyReservation: boolean;
  OrgCompanycode: string;
  roomstype: any;
  addcompanydiv: boolean = false;
  searchresultsdiv: boolean = true;
  addcompanybtn: boolean = true;
  selectedRoomcode: any;
  ReferanceList: any;
  subpaymodelist: any;
  error: string;
  guest: any;
  picodelist: any;
  referencelist: any;
  companylist: any;
  driverlist: any;
  theme = "bootstrap";
  type = "default";
  closeOther = false;
  position = 'top-right';
  NodaysChanged: number = 0;
  form: FormGroup;
  datePickerConfig: Partial<BsDatepickerConfig>;
  timepicker: Partial<TimepickerConfig>;
  planlist = [];
  public data: Observable<any>

  //forms: FormArray = this.formBuilder.array([]);
  model: any = {};

  selectedOption = "3";
  isDisabled = true;
  TotalBillAmount: number;
  TotalPaidAmount: number;
  TotalBalanceAmount: number;
  selectedCharacter = "3";
  timeLeft = 5;
  roomtype = [];
  companytype: any;
  checkinform: any;
  public navRight: string;
  paymentmode: string[] = ["Cash", "Card", "Online", "Walet"];
  public noofdays: number[] = [];
  public requiredRoomlist: number[] = [];
  foriegnguest: string[] = ["Yes", "No"];
  discounttypes = ["Amount", "%"];
  genderitems: any;
  gender: any;
  pincode: any;

  booking: HMSReservationBookingmodel;

  bookings: HMSReservationBookingmodel[];
  maxDate = new Date();
  myTime = new Date();
  ismeridian: boolean = false;
  minDate: Date;
  valid: boolean = true;
  reservloader: boolean = true;
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

  purposeofvisit = [];
  newspaper = [];
  billinginstruction = [];
  howuknow = [];
  Nationlist = [];
  Titlelist = [];
  ResLabel: string;
  IsReservation: boolean;
  IsAmendReservation: boolean;
  OrgReservationNo: string;
  Branch: string;
  todate = new Date();
  fromdate = new Date();
  Availabilitylist: Availabilitymodel[] = [];
  Reservationform: HMSReservationFormmodel;
  ReservationAmendform: any;

  hintColor: string = "red";
  private _searchTerm: string;

  @ViewChild('searchTerm', { static: false }) searchTerm: ElementRef;
  @ViewChild('searchTermref', { static: false }) searchTermref: ElementRef;
  @ViewChild('searchTermguest', { static: false }) searchTermguest: ElementRef;
  @ViewChild('searchTermcompany', { static: false }) searchTermcompany: ElementRef;
  @ViewChild('checkoutdatechange', { static: false }) checkoutdatechange: ElementRef;

  public golbalresponse: any;

  @ViewChild('f', { static: false }) newcompanyform: any;
  @ViewChild('draggable', { static: false }) public draggableElement: ElementRef;

  constructor(private datePipe: DatePipe, elementRef: ElementRef,
    public router: Router, private toastyService: ToastyService,
    public formBuilder: FormBuilder, private _bankservice: BankService,
    private route: ActivatedRoute, private savecheckin: CheckinService,
    private roomservice: RoomtypeService, private confirmationDialogService: ConfirmationDialogService,
    private _masterservice: MasterformService, public _addressservice: AddressService, public _reservationservice: ReservationService
  ) {

    this._bankservice.changeMessage("collapsed")
    this.Branch = localStorage.getItem("BranchCode");
    this.Branch = "CW_1001"

    let ReservationNo;
    // this.Id$=this.route.snapshot.paramMap.pipe(map(paramMap=>paramMap.get('id')));
    //let RoomNo=this.route.snapshot.paramMap.get('RoomNo');
    this.route.paramMap.subscribe(param => {
      this.OrgReservationNo = param.get("ResNo");
    })

    if (this.OrgReservationNo == "NewRes") {
      this.IsReservation = true;
      this.IsAmendReservation = false;
      this.ResLabel = "New Reservation";
    }
    else {
      this.IsReservation = false;
      this.IsAmendReservation = true;
      this.ResLabel = "Ammend Reservation / " + this.OrgReservationNo;
    }


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
      arivalmode: ["Reservation", [Validators.required]],
      title: ["Mr", [Validators.required]],
      bookingid: ["", [Validators.required]],
      convenience: ["", [Validators.required]],
      guestname: ["", [Validators.required]],
      gender: ["Male", [Validators.required]],
      mobile: ["", [Validators.required]],
      email: ["", [Validators.required]],
      foriegnguest: ["No", [Validators.required]],
      Address1: ["", [Validators.required]],
      Address2: ["", [Validators.required]],
      Address3: ["", [Validators.required]],
      pincode: ["", [Validators.required]],
      city: ["", [Validators.required]],
      state: ["", [Validators.required]],
      nation: ["India", [Validators.required]],
      gstno: ["", [Validators.required]],
      other: this.formBuilder.array([]),
      checkindate: [new Date(), [Validators.required]],
      checkintime: [this.myTime, [Validators.required]],
      checkouttime: [this.myTime, [Validators.required]],
      nofdays: ["1", [Validators.required]],
      checkoutdate: [this.maxDate, [Validators.required]],
      company: ["", [Validators.required]],
      //disctype: ["select", [Validators.required]],
      BillAmount: ["", [Validators.required]],
      // discvalue: ["", [Validators.required]],
      graceperiod: ["", [Validators.required]],
      PayArray: this.formBuilder.array([this.AddpaymentGrid()]),
      visit: ["select", [Validators.required]],
      cometoknow: ["select", [Validators.required]],
      Billing: ["select", [Validators.required]],
      RefName: [""],
      BranchCode: [this.Branch, [Validators.required]],
      randomCheckinNo: ['0', [Validators.required]],
      IpAdd: [localStorage.getItem("LOCAL_IP")],
      CreatedBy: [localStorage.getItem("id"), [Validators.required]]
    });

    
    this.form.get('checkoutdate').valueChanges.subscribe(() => {
     

      // console.log('Cnstructor Changed')
      // let CheckinDate = this.datePipe.transform(this.form.get('checkindate').value, "MM/dd/yyyy");
      // let checkoutdate = this.datePipe.transform(this.form.get('checkoutdate').value, "MM/dd/yyyy");
      // console.log(CheckinDate)
      // console.log(checkoutdate)
      // if (CheckinDate < checkoutdate) {

      //   let numberofdays = (datediff(parseDate(CheckinDate), parseDate(checkoutdate)));
      //   alert(numberofdays)
      //   this.form.patchValue({
      //     nofdays: numberofdays
      //   });
      // }
      // else {
      //   this.addToast("Cogwave Software", "Departure Date +  '" + checkoutdate + "' Less  then Arrival Date ", "info");
      // }

    });


  }


  AddBokingButtonviaForeach(resdata: any): void {
    (<FormArray>this.form.get("other")).push(this.AddbokingGridviaForeach(resdata));
  }

  AddbokingGridviaForeach(resdata): FormGroup {
    let Required, DiscountType, Disvalue, Plans;
    if (resdata.IsSelect == true) {
      Required = resdata.Required;
      DiscountType = resdata.Distype;
      Disvalue = resdata.Disvalue;
      Plans = resdata.PlanName;
    }
    else {
      Required = "0";
      DiscountType = "0";
      Disvalue = "0";
      Plans = "EP";
    }
    return this.formBuilder.group({
      bankAccountID: ["0"],
      RoomCode: [resdata.RoomCode],
      Available: [resdata.Available, [Validators.required]],
      Required: [Required, [Validators.required]],
      Pax: [resdata.Pax, [Validators.required]],
      PlanName: [Plans, [Validators.required]],
      Food: [resdata.Food, [Validators.required]],
      Tariff: [resdata.Tariff, [Validators.required]],
      Tax: [resdata.Tax, [Validators.required]],
      Grand: [resdata.Grand, [Validators.required]],
      Net: [resdata.Net, [Validators.required]],
      disctype: [DiscountType, [Validators.required]],
      discvalue: [Disvalue, [Validators.required]]
    });
  }







  ngOnInit() {

    this.TotalBillAmount = 0;
    this.TotalBalanceAmount = 0;
    this.TotalPaidAmount = 0;

    this.CreateRequiredRoom(20);
    setTimeout(() => {
      this.reservloader = false;
    }, 7000)

    this.model.frmdate=new Date();
    this.fromdate = new Date();
    this.todate.setDate(this.fromdate.getDate() + 15);
    let fromdates = this.datePipe.transform(this.fromdate, "MM/dd/yyyy");
    let todates = this.datePipe.transform(this.todate, "MM/dd/yyyy");
    this._reservationservice.GetAvailability(fromdates, todates).subscribe((res) => {
      this.golbalresponse = res;
    },
      error => {
        console.log(error.message);
      },
      () => {
        console.log("Product fetched sucssesfully.");
        this.Availabilitylist = this.golbalresponse;
        console.log(this.Availabilitylist)
        this.roomstype = this.Availabilitylist[0].Rooms;
      }
    )

    if (this.IsReservation == true) {
      let reservation = new HMSReservationFormmodel()
      {
        reservation.CheckInDate = fromdates;
        reservation.CheckOutDate = todates;
        reservation.ArrivalTime = this.datePipe.transform(this.form.get('checkintime').value, "HH:mm");
        reservation.DepartureTime = this.datePipe.transform(this.form.get('checkouttime').value, "HH:mm")
        reservation.NoDays = 1;
        reservation.BranchCode = this.Branch;
      }

      this._reservationservice.GetBookingData(reservation).subscribe((data) => {
        this.golbalresponse = data;
      },
        error => {
          console.log(error.message);
        },
        () => {
          console.log("Product fetched sucssesfully.");
          this.Reservationform = this.golbalresponse;
          console.log(this.Reservationform)
          for (let resdata of this.Reservationform.booking) {
            this.AddBokingButtonviaForeach(resdata)
          }
        });
    }
    else {
      this.OrgCompanycode = "0";
      this.IsCompanyReservation = false;
      this._reservationservice.GetBookingDetailViaRes(this.Branch, this.OrgReservationNo).subscribe((res: any) => {
        console.log(res)
        this.ReservationAmendform = res;
        let Guestmodel = this.ReservationAmendform.Guest
        let companymodel = this.ReservationAmendform.company
        let ResMastermodel = this.ReservationAmendform.ResMaster
        let ReservationBookedSlaveArray = [];
        var AllreadyBookedType = [];
        let Checkintime, checkoutTime, checkindate, checkoutdate;
        ReservationBookedSlaveArray = this.ReservationAmendform.ResSlave;
        ReservationBookedSlaveArray.forEach(Slave => {
          AllreadyBookedType.push(Slave.RoomCode)
          // Checkintime="12:30";
          //checkoutTime=this.datePipe.transform(Slave.CheckoutTime, "HH:mm");
          checkindate = this.datePipe.transform(Slave.CheckinDate, "dd/MM/yyyy"); //correct dont change
          checkoutdate = this.datePipe.transform(Slave.CheckoutDate, "dd/MM/yyyy");  //correct dont change      
        });

        // console.log(Checkintime)
        // console.log(checkoutTime)
    
        console.log('Guestmodel')
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
          Address1: Guestmodel.Address1,
          Address2: Guestmodel.Address2,
          Address3: Guestmodel.Address3,
          gstno: Guestmodel.GSTNO,
          foriegnguest: Guestmodel.ForeignGuest,
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
          checkoutdate: checkoutdate
        })
        if (companymodel != null) {
          this.form.patchValue({
            companycode: companymodel.CompanyCode,
            gstno: companymodel.GSTNO,
            company:companymodel.CompanyName

          })
          this.OrgCompanycode = companymodel.CompanyCode;
          this.IsCompanyReservation = true;
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
          reservation.TypeBook = "A";
          reservation.ReservNo = this.OrgReservationNo;
        }
        console.log(reservation)
        this._reservationservice.GetBookingData(reservation).subscribe((data) => {
          this.golbalresponse = data;
        },
          error => {
            console.log(error.message);
          },
          () => {
            console.log("Booking fetched sucssesfully.");
            this.Reservationform = this.golbalresponse;
            console.log(this.Reservationform)

            // let BooikngLength=this.Reservationform.booking.length;
            // for(let i = 0; i < BooikngLength; i++ )
            // {// }


            for (let resdata of this.Reservationform.booking) {
              this.AddBokingButtonviaForeach(resdata)
            }
          });


      });
    }


    // for (let i = 0; i < this.other.length; i++) {
    //   //     this.onDelete(0, i)
    //   //     // let index = (<FormArray>this.form.get('Other')).controls.findIndex(x => x.value === i);
    //   //   }


    this.model.Id = 0;
    this.model.CompanyCode = 0;
    this.model.BranchCode = "0";
    this.model.CreatedBy = localStorage.getItem("Id");
    this.searchresultsdiv = true;
    this._masterservice.getreferencedetail(this.Branch).subscribe(res => {
      this.ReferanceList = res;
    })

    this._masterservice.Getmiscellaneous('Gender').subscribe(data => {
      this.gendertypes = data;
    })

    this._masterservice.GetAllNation().subscribe(data => {
      this.Nationlist = data;
    })

    this._masterservice.Getmiscellaneous('Title').subscribe(data => {
      this.Titlelist = data;
    })

    this._masterservice.Getmiscellaneous('Arrival Mode').subscribe(data => {
      this.arrivalmode = data;
    })
    this._masterservice.Getmiscellaneous('Source').subscribe(data => {
      this.sourcemode = data;
    })

    this._masterservice.Getmiscellaneous('Purpose of Visit').subscribe(data => {
      this.purposeofvisit = data;
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
      console.log(this.planlist);
    });

    this.roomservice.GetRoomType("CW_1001").subscribe(data => {
      this.roomtype = data as [];
      console.log(this.roomtype);
    });
    this.CreateNoofDays(31)
    this.handleFormChanges();

  }

  handleFormChanges() {
    console.log('handleFormChanges checkoutdate value change')
    this.form.get('checkoutdate').valueChanges.subscribe(() => {

      let CheckinDate = this.datePipe.transform(this.form.get('checkindate').value, "MM/dd/yyyy");
      let checkoutdate = this.datePipe.transform(this.form.get('checkoutdate').value, "MM/dd/yyyy");
      console.log(CheckinDate)
      console.log(checkoutdate)
      if (CheckinDate < checkoutdate) {

        let numberofdays = (datediff(parseDate(CheckinDate), parseDate(checkoutdate)));
        alert(numberofdays)
        this.form.patchValue({
          nofdays: numberofdays
        });
      }
      else {
        this.addToast("Cogwave Software", "Departure Date +  '" + checkoutdate + "' Less  then Arrival Date ", "info");
      }

    });
    // this.form.valueChanges.subscribe((user: any) => {
    //   console.log('----Form Data---');
    //   console.log('username: '+ user.checkoutdate);
    //   alert('s') 
    // });
  }




  ngOnDestroy() {
    this._bankservice.changeMessage("expanded")
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

  CalculateAdvanceAmount(index: number, AdvanceAmount: number) {
    let paymode = this.PayArray.controls[index].get('Paymode').value;
    let Paysubmode = this.PayArray.controls[index].get('Paysubmode').value;
    if (paymode == "select" || Paysubmode == "select") {
      this.PayArray.controls[index].patchValue({
        payAmount: 0
      })
      this.addToast("Cogwave Software", "Invalid Mode Selected", "error");
      return;
    }


    this.TotalPaidAmount = 0;
    this.TotalBalanceAmount = 0;
    if (AdvanceAmount > 0) {
      for (let Payarray of this.PayArray.controls) {
        this.TotalPaidAmount += Payarray.get("payAmount").value;
      }
      this.TotalBalanceAmount = this.TotalBillAmount - this.TotalPaidAmount;
    }
    else {
      this.PayArray.controls[index].patchValue({
        payAmount: 0
      })
      this.addToast("Cogwave Software", "Invalid Advance Amount", "error");
    }
  }


  Submit() {

    if (this.TotalBillAmount <= 0) {
      this.addToast("Cogwave Software??", "Booking Not Selected Please Select Booking", "error");
      return;
    }

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
          var checkoutDates = '';
          let cku = this.form.value.checkoutdate;
          var checkinDates = '';
          let chkin = this.form.value.checkindate;
          debugger
          if (chkin.length == 10) {
          }
          else {
            checkinDates = this.datePipe.transform(this.form.value.checkindate, "MM/dd/yyyy");
            this.form.value.checkindate = checkinDates;
          }
          if (cku.length == 10) {
          }
          else {
            checkoutDates = this.datePipe.transform(this.form.value.checkoutdate, "MM/dd/yyyy");
            this.form.value.checkoutdate = checkoutDates;
          }
          this.form.value.checkintime = this.datePipe.transform(this.form.value.checkintime, "HH:mm");
          this.form.value.checkouttime = this.datePipe.transform(this.form.value.checkouttime, "HH:mm");
          this._reservationservice.SaveReservationData(this.form.value)
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

        }//confoirmtrue end  
        else {
        }
      })
      .catch(() => {
        alert('cach')
        console.log('e.g., by using ESC, clicking the cross icon, or clicking outside the dialog')
      });

  }

  ngAfterViewInit() {


   

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
  }
  CreateRequiredRoom(number) {
    for (var i = 1; i <= number; i++) {
      this.requiredRoomlist.push(i);
    }
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
    //this.minDate = new Date();
    // let CheckinDatce=this.datePipe.transform(this.form.get('checkindate').value,"MM/dd/yyyy");
    let CheckinDatce = this.form.get('checkindate').value;

    this.maxDate.setDate(CheckinDatce.getDate() + parseInt(NoOfDays));
    var result = this.datePipe.transform(this.maxDate, "dd/MM/yyyy");
    this.form.patchValue({
      checkoutdate: result
    })

  }



  onDelete(bankAccountID, i) {
    if (i != 0) (<FormArray>this.form.get("other")).removeAt(i);
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


  AddPaymentButtonClick(): void {
    (<FormArray>this.form.get("PayArray")).push(this.AddpaymentGrid());
  }


  onDeletePayment(bankAccountID, k) {
    if (k != 0) (<FormArray>this.form.get("PayArray")).removeAt(k);
  }

  get other(): FormArray {
    return this.form.get("other") as FormArray;
  }


  get PayArray(): FormArray {
    return this.form.get("PayArray") as FormArray;
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







  //  Openmodel

  GuestModelOpen(event, data) {
    this.filterQuery = "";
    document.querySelector("#" + event).classList.add("md-show");
  }
  PatchGuest(SelectedData: any, event: any) {
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
    var allbtn = document.querySelector('.md-show');
    console.log(allbtn);
    allbtn.classList.remove("md-show");
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
   
  ReferanceSave(form?: NgForm)
  {
    form.value.BranchCode = localStorage.getItem("BranchCode")
    form.value.CreatedBy = localStorage.getItem("id");
    form.value.IsActive = true;
    form.value.RefAdress = "0";
    form.value.RefPoints =0;
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
        this.addToast("Cogwave Software", "Company Data Not Saved", "error");
      }
    });
    console.log(form.value);
  }


  PinCodeModelOpen(event, data) {
    this.filterQuery = "";
    document.querySelector("#" + event).classList.add("md-show");
  }
  PatchPincode(SelectedData: any, event: any) {
    this.form.patchValue({
      pincode: SelectedData.Pincode,
      city: SelectedData.AreaData,
      state: SelectedData.City,
      nation: "India",
    })
    var allbtn = document.querySelector('.md-show');
    console.log(allbtn);
    allbtn.classList.remove("md-show");
  }



  CompanyModelOpen(event, data) {
    this.filterQuery = "";
    document.querySelector("#" + event).classList.add("md-show");
  }

  PatchCompany(SelectedData: any, event: any) {
    console.log("ttest");
    this.form.patchValue({
      company: SelectedData.CompanyName,
      gstno: SelectedData.GSTNO,
      companycode: SelectedData.CompanyCode
    })
    // this.CompanyCheckin(SelectedData.CompanyCode);
    this.form.get('company').disable({ onlySelf: true });
    this.form.get('gstno').disable({ onlySelf: true });
    var allbtn = document.querySelector('.md-show');
    console.log(allbtn);
    allbtn.classList.remove("md-show");
  }

  CompanySave(form?: NgForm) {
    debugger;
    form.value.BranchCode = localStorage.getItem("BranchCode")
    form.value.CreatedBy =  localStorage.getItem("id");
    form.value.CompanyCode="0";
    form.value.Id="0";
    if (form.invalid) {
      console.log(form.value);
      this.addToast("Cogwave Software", "invalid Data", "warning");
      return;
    }
    this._masterservice.SaveCompanyMinData(form.value).subscribe(data => {
      if (data == true) {
        if (form.value.CompanyCode == "0") {
          this.addToast(
            "Cogwave Software",
            "Company Data Saved Sucessfully",
            "success"
          );
          this.searchresultsdiv = true;
          this.addcompanydiv = false;
          this.addcompanybtn = true;
          this.CompanyModelOpen('effect-7', data)
        }

      }
      else {
        this.addToast("Cogwave Software", "Company Data Not Saved", "error");
      }
    });
    console.log(form.value);
  }



  Availability(event) {
    document.querySelector("#" + event).classList.add("md-show");
  }

  BookingGrid(index: number, Changed: string) {
    debugger;
    let avaliableRoom = this.other.controls[index].get("Available").value
    let RequiredRoom = this.other.controls[index].get("Required").value

    if (RequiredRoom == null) {
      return;
    }

    if (avaliableRoom < RequiredRoom) {
      this.other.controls[index].patchValue({
        Required: 0
      })
      this.addToast("Cogwave Software", "Required Room is Greater then Avaliable Room ", "info");
      return;
    }
    else {
      //  this.hintColor="Green";
    }

    debugger;
    this.booking = {
      RoomCode: this.other.controls[index].get("RoomCode").value,
      Available: this.other.controls[index].get("Available").value,
      Required: this.other.controls[index].get("Required").value,
      Pax: this.other.controls[index].get("Pax").value,
      PlanName: this.other.controls[index].get("PlanName").value,
      Food: this.other.controls[index].get("Food").value,
      Tariff: this.other.controls[index].get("Tariff").value,
      Tax: this.other.controls[index].get("Tax").value,
      Grand: this.other.controls[index].get("Grand").value,
      Net: this.other.controls[index].get("Net").value,
      Dirty: true,
      IsSelect: true,
      Child: 0,
      Male: 0,
      Female: 0,
      Distype: "0",
      Disvalue: 0,
      Id: 2
    };
    debugger;
    var bok = this.booking;
    let convertlist = [];
    convertlist.push(bok)

    this.golbalresponse = convertlist;
    this.Reservationform.booking = this.golbalresponse;
    this.Reservationform = {
      BranchCode: this.Branch,
      ReservNo: "0",
      Advance: 0,
      Instructions: "0",
      ChangeId: Changed,
      IsAmend: false,
      Logger: "o",
      IsConfirmed: true,
      IsCompany: false,
      CheckInDate: this.datePipe.transform(this.form.get('checkindate').value, "MM/dd/yyyy"),
      CheckOutDate: this.datePipe.transform(this.form.get('checkoutdate').value, "MM/dd/yyyy"),
      ArrivalTime: this.datePipe.transform(this.form.get('checkintime').value, "HH:mm"),
      DepartureTime: this.datePipe.transform(this.form.get('checkouttime').value, "HH:mm"),
      NoDays: this.form.value.nofdays,
      booking: this.golbalresponse,
      TypeBook: "R",
      BookedRoomCodelist: "0"
    }


    this._reservationservice.EditsingleBookingDetails(this.Reservationform).subscribe(data => {
      console.log('data');
      console.log(data);
      console.log(data.booking[0].RoomCode);
      let netAmount = data.booking[0].Grand * this.form.value.nofdays;
      this.other.controls[index].patchValue({
        RoomCode: data.booking[0].RoomCode,
        Available: data.booking[0].Available,
        Required: data.booking[0].Required,
        Pax: data.booking[0].Pax,
        PlanName: data.booking[0].PlanName,
        Food: data.booking[0].Food,
        Tariff: data.booking[0].Tariff,
        Tax: data.booking[0].Tax,
        Grand: data.booking[0].Grand,
        Net: netAmount * data.booking[0].Required
      });
      debugger;
      const controlArray = this.form.get('other') as FormArray;
      console.log('controlArray');
      console.log(controlArray);
      let formotherlist = controlArray.value;
      let BillAmount = 0;
      for (let otherarray of formotherlist) {
        if (otherarray.Required > 0) {
          BillAmount += otherarray.Net;
        }
      }
      this.TotalBillAmount = BillAmount;
      this.TotalBalanceAmount = this.TotalBillAmount - this.TotalPaidAmount;

      this.form.patchValue({
        BillAmount: BillAmount
      });
      //alert(BillAmount)
    });
  }





  addToast(title, Message, theme) {

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



  addcompanyinmodel() {
    this.companylist = [];
    this.addcompanydiv = true;
    //this.searchresultsdiv = false;
    this.addcompanybtn = false;
    console.log("clock");
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



}


function parseDate(str) {
  var mdy = str.split('/');
  return new Date(mdy[2], mdy[0] - 1, mdy[1]);
}

function datediff(first, second) {
  // Take the difference between the dates and divide by milliseconds per day.
  // Round to nearest whole number to deal with DST.
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
}






