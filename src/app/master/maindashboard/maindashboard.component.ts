import { ChangePlanFormmodel } from './../../_models/ChangePlanFormmodel';
import { AmendRoommodel } from './../../_models/AmendRoommodel';
import { RoomShifftFormmodel } from './../../_models/RoomShifftFormmodel';
import { ExtraBedFormmodel } from './../../_models/ExtraBedFormmodel';
import { GuestcreationComponent } from './../guestcreation/guestcreation.component';
import { User } from './../../_models/user';
import { Commonmodel } from './../../_models/Commonmodel';
import { filter } from 'rxjs/operators';
import { ElementRef } from '@angular/core';
import { BlockingdetailsComponent } from './blockingdetails/blockingdetails.component';
import { Router } from '@angular/router';
import { ReservationService } from './../../_services/reservation.service';
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, DoCheck } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Observable } from 'rxjs';
import { MasterformService } from './../../_services/masterform.service';
import { HmsdashboardService } from './../../_services/hmsdashboard.service';
import { IpserviceService } from 'src/app/_services/ipservice.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { BankService } from 'src/app/_services/bank.service';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { DatePipe } from "@angular/common";
import { OperationService } from 'src/app/_services/operation.service';
import { error } from 'util';
import { EditPaxRateFormmodel } from 'src/app/_models/EditPaxRateFormmodel';




import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
@Component({
  selector: 'app-maindashboard',
  templateUrl: './maindashboard.component.html',
  styleUrls: ['./maindashboard.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss'],
})
export class MaindashboardComponent implements OnInit, OnDestroy {
  public roomsdetail;
  model2: any = {};
  @ViewChild("f", { static: false }) form: any;
  roomname: any;
  DasboardLoad: any;
  floorname: any;
  rmno: string;
  theme = "bootstrap";
  type = "default";
  position = 'top-right';
  Refinputs: string;
  roomname1: string;
  GuestData: any;
  CheckinData: any;
  UserId: number;
  RoomCodes: string;
  RoomNos: string;
  extrabedform: ExtraBedFormmodel;
  roomshifftformmodel: RoomShifftFormmodel
  finalMenu = new Array();
  floor = new Array<any>();
  vacantRoom = new Array<any>();
  timepicker: Partial<TimepickerConfig>;
  changepaxform: EditPaxRateFormmodel;
  amendformdata: AmendRoommodel;
  changeplanformmodel: ChangePlanFormmodel
  model: any;
  Branch: string;
  BookingList: any;
  myTime = new Date();
  valid: boolean = true;
  isValid(event: boolean): void {
    this.valid = event;
  }

  @ViewChild(BlockingdetailsComponent, { static: false }) block: BlockingdetailsComponent
  @ViewChild('Name1', { static: false }) name: ElementRef
  constructor(private datePipe: DatePipe, private _masterformservice: MasterformService,
    private router: Router,
    private http: HttpClient, private _reservationservice: ReservationService,
    private toastyService: ToastyService, private _oprservice: OperationService,
    private _ipservice: IpserviceService, private _hmsdashboard: HmsdashboardService,
    private _bankservice: BankService, private _OprService: OperationService) {

    this.Branch = "CW_1001";
    this.UserId = 1;
  }

  ngOnInit() {



    this.model = {
      Id: 0,
      BranchCode: this.Branch,
      IpAdd: 1,
      CreatedBy: 1,
      RoomNo: this.RoomNos,
      RoomCode: this.RoomCodes,
      Pax: "0",
      SRoomNo: "select"
    }

    this.changepaxform = {
      RoomNo: "0",
      RoomCode: "0",
      GuestName: "0",
      Pax: 0,
      ActualRate: 0,
      OfferRate: 0,
      Tax: 0,
      NetAmount: 0,
      Reason: "Change Pax",
      Mode: "Change",
      Id: 0,
      BranchCode: this.Branch,
      IpAdd: "0",
      CreatedBy: this.UserId,
    }



    this._reservationservice.GetBookingList(this.Branch).subscribe(data => {
      this.BookingList = data;
    });
    this._hmsdashboard.GetHmsDashboard(this.Branch).subscribe(res => {
      this.finalMenu = res;
      this.vacantRoom = res['Rooms'].filter(a => a.Status == "V");
      this.DasboardLoad = setInterval(() => {
        this._hmsdashboard.GetHmsDashboard(this.Branch).subscribe(res => {
          this.finalMenu = res;
          this.vacantRoom = res['Rooms'].filter(a => a.Status == "V");
        })
      }, 7000)
    })
  }



  ngOnDestroy() {
    clearInterval(this.DasboardLoad);
  }



  LoadReservationCheckinpage(ResNo: string) {
    this.router.navigate(['/Master/reschk', ResNo])
  }

  OpenMyModel(event, name) {
    document.querySelector("#" + event).classList.add("md-show");
  }


  openRoomsPopup(event, roomname) {

    this.model2 = {
      roomname: roomname,
    };
    console.log("roomname" + roomname);
    document.querySelector("#" + event).classList.add("md-show");
  }

  OpenBlockDetails(event) {
    console.log("openspecial");
    document.querySelector("#" + event).classList.add("md-show");
  }

  openspecial(event, roomname) {
    console.log("openspecial");
    document.querySelector("#" + event).classList.add("md-show");
  }
  parentroomhover(CrRoomNo: string, CrRoomCode: string) {
    this.rmno = CrRoomNo;
    this.roomname1 = CrRoomCode;
    this.RoomNos = CrRoomNo;
    this.RoomCodes = CrRoomCode;
    console.log('Francis');
    console.log(CrRoomNo + CrRoomCode);
  }


  modelroomhover() {
    console.log("test");
  }

  // AddOrEditOrderItem(orderItemIndex, OrderID) {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.disableClose = true;
  //   dialogConfig.width = "50%";
  //   dialogConfig.data = { orderItemIndex, OrderID };
  //   this.dialog.open(BlockingdetailsComponent, dialogConfig).afterClosed().subscribe(res => {
  //     //this.updateGrandTotal();
  //   });
  // }

  popinsidepopforguestnamefunc(event) {
    document.querySelector("#" + event).classList.add("md-show");
    alert("fdfdf")

  }
  popinsidepopforguestnamefunc1(event) {
    document.querySelector("#" + event).classList.add("md-show");
  }

  closeMyModalPin(event) {
    console.log("remove");
    var openModals = document.querySelectorAll(".md-show");
    for (let i = 0; i < openModals.length; i++) {
      openModals[i].classList.remove("md-show");
    }
  }
  closeMyModal(event) {
    event.target.parentElement.parentElement.parentElement.classList.remove(
      "md-show"
    );
  }

  // ------------------------------------Model--------------------
  // Post-OpenPosModel
  // Advance-OpenAdvanceModel
  // Shifft-OpenShifftModel
  // Discount-OpenDiscountModel
  // ExtraBed-OpenExtraBedModel
  // ChangePax-OpenChangepaxModel
  // Amend-OpenAmendModel
  // ChangeCompany-OpenChangeCompanyModel
  // HouseGuest-OpenHouseGuestModel
  // ChangePlan-OpenChangePlanModel
  // ChangeGuest-OpenChangeGuestModel
  // Instruction-OpenInstructionModel
  // FoodCoupon-OpenFoodCouponModel
  // PaxonBill-OpenPaxonBillModel
  // SmsCoupon-OpenSmsCouponModel
  // linkunlink-OpenlinkunlinkModel
  // WakeUp-OpenWakeUpModel
  // HouseKeeping-OpenHouseKeepingModel
  // Compliment-OpenComplimentModel
  // EditRate-OpenEditRateModel
  // ExpressCheckin-OpenExpressCheckinModel
  // Block-OpenBlockModel
  // Management-OpenManagementModel
  // Rate-OpenRateModel
  // RoomHistory-OpenRoomHistoryModel
  // GuestHistory-OpenGuestHistoryModel
  // Poweronvisit-OpenPoweronvisitModel
  // PoweronCleaning-OpenPoweronCleaningModel
  // PowerOff-OpenPowerOffModel
  // Release-OpenReleaseModel

  OpenModel(event, RoomNo) {

    let Description = event;
    switch (Description) {
      case "Blockdetails":
        break;
      case "Discount":
        break;
      case "Post":
        break;
      case "Advance":
        break;
      case "Shifft":
        this.ProcessRoomShift(RoomNo);
        break;
      case "Discount":
        break;
      case "ExtraBed":
        this.ProcessExtraBed(RoomNo);
        break;
      case "Changepax":
        this.ProcessChangePax(RoomNo);
        break;
      case "Amend":
        this.ProcessAmend(RoomNo);
        break;
      case "ChangeCompany":
        break;
      case "HouseGuest":
        break;
      case "PaxonBill":
        break;
      case "linkunlink":
        break;
        case "linkunlink1":
        break;
      case "ChangePlan":
        this.ProcessChangePlan(RoomNo)
        break;
    }
    console.log(event)
    console.log('event')
    document.querySelector("#" + event).classList.add("md-show");

  }

  ProcessExtraBed(RoomNo: string) {
    this._OprService.GetExtraBedFormData(this.Branch, RoomNo).subscribe(res => {

      this.extrabedform = res;
      this.extrabedform.CreatedBy = this.UserId;
    },
      error => {
        console.log('error in ProcessExtraBed')
      },
      () => {
        console.log('Sucess in ProcessExtraBed')
      })

  }

  ProcessAmend(RoomNo: string) {
    this._OprService.GetAmendFormData(this.Branch, RoomNo).subscribe(res => {
      this.amendformdata = res;
      this.amendformdata.CreatedBy = this.UserId;
    },
      error => {
        console.log('error in ProcessExtraBed')
      },
      () => {
        console.log('Sucess in ProcessExtraBed')
      })

  }

  ProcessChangePax(RoomNo: string) {

    this._OprService.GetPaxEditFormData(this.Branch, RoomNo).subscribe(res => {
      this.changepaxform = res;
      this.changepaxform.CreatedBy = this.UserId;
    },
      error => {
        console.log('error in ProcessChangePax')
      },
      () => {
        console.log('Sucess in ProcessChangePax')
      })
  }

  ProcessRoomShift(RoomNo: string) {

    this._OprService.GetRoomShiftFormData(this.Branch, RoomNo).subscribe(res => {
      this.roomshifftformmodel = res;
      this.roomshifftformmodel.CreatedBy = this.UserId;
    },
      error => {
        console.log('error in ProcessExtraBed')
      },
      () => {
        console.log('Sucess in ProcessExtraBed')
      })

  }

  ProcessChangePlan(RoomNo: string) {
    this._OprService.GetChangePlanFormData(this.Branch, RoomNo).subscribe(res => {
      this.changeplanformmodel = res;
      this.changeplanformmodel.CreatedBy = this.UserId;
    },
      error => {
        console.log('error in ProcessChangePax')
      },
      () => {
        console.log('Sucess in ProcessChangePax')
      })
  }



  OpenModelWithRoomDetails(event) {
    let Description = event;
    switch (Description) {
      case "linksGroup":
        break;
      case "OccupiedPopup":
        break;
      case "idblockingdetails":
        break;
      case "vacantdetails":
        break;

    }
    console.log(event)
    console.log('event')
    document.querySelector("#" + event).classList.add("md-show");
  }



  modalVacentHide(event) {
    var allbtn = document.querySelector('.md-show');
    console.log(allbtn);
    allbtn.classList.remove("md-show");

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


