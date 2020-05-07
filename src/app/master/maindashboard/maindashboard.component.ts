import { Roominstructionmodel } from "./../../_models/Roominstructionmodel";

import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit,
  DoCheck
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { MasterformService } from "./../../_services/masterform.service";
import { HmsdashboardService } from "./../../_services/hmsdashboard.service";
import { IpserviceService } from "src/app/_services/ipservice.service";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { BankService } from "src/app/_services/bank.service";
import { TimepickerConfig } from "ngx-bootstrap/timepicker";
import { DatePipe } from "@angular/common";
import { OperationService } from "src/app/_services/operation.service";
import { error } from "util";
import { EditPaxRateFormmodel } from "src/app/_models/EditPaxRateFormmodel";
import { PaxonBillmodel } from "./../../_models/PaxonBillmodel";
import { ChangePlanFormmodel } from "./../../_models/ChangePlanFormmodel";
import { AmendRoommodel } from "./../../_models/AmendRoommodel";
import { RoomShifftFormmodel } from "./../../_models/RoomShifftFormmodel";
import { ExtraBedFormmodel } from "./../../_models/ExtraBedFormmodel";
import { GuestcreationComponent } from "./../guestcreation/guestcreation.component";
import { ElementRef } from "@angular/core";
import { BlockingdetailsComponent } from "./blockingdetails/blockingdetails.component";
import { Router } from "@angular/router";
import { ReservationService } from "./../../_services/reservation.service";
import { ConfirmationDialogService } from '../../_services/confirmation-dialog.service';
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
import { DiscountFormmodel } from "src/app/_models/DiscountFormmodel";
import { ChangeCompanymodel } from "src/app/_models/ChangeCompanymodel";
import { Foodcouponmodel } from "src/app/_models/Foodcouponmodel";

@Component({
  selector: "app-maindashboard",
  templateUrl: "./maindashboard.component.html",
  styleUrls: [
    "./maindashboard.component.scss",
    "../../../assets/icon/icofont/css/icofont.scss"
  ]
})
export class MaindashboardComponent implements OnInit, OnDestroy {
  public roomsdetail;
  model2: any = {};
  @ViewChild("f", { static: false }) form: any;
  roomname: any;
  golbalresponse: any;
  RoomNoArray: string[] = [];

  OriginalArray: string[] = [];
  selectedRoomNoArray: string[] = [];
  DasboardLoad: any;
  floorname: any;
  rmno: string;
  roominstructionmodel: any;
  theme = "bootstrap";
  type = "default";
  position = "top-right";
  Refinputs: string;
  roomname1: string;
  GuestData: any;
  CheckinData: any;
  UserId: number;
  RoomCodes: string;
  RoomNos: string;
  extrabedform: ExtraBedFormmodel;
  roomshifftformmodel: RoomShifftFormmodel;
  discountform: DiscountFormmodel;
  changecompanyform: ChangeCompanymodel;
  paxonbillform: PaxonBillmodel;
  RoomInstruction: Roominstructionmodel;
  Foodcouponmodel:Foodcouponmodel;
  finalMenu = new Array();
  floor = new Array<any>();
  vacantRoom = new Array<any>();
  timepicker: Partial<TimepickerConfig>;
  changepaxform: EditPaxRateFormmodel;
  amendformdata: AmendRoommodel;
  changeplanformmodel: ChangePlanFormmodel;
  model: any;
  Branch: string;
  BookingList: any;
  linkroommodel: any;
  myTime = new Date();
  valid: boolean = true;
  isValid(event: boolean): void {
    this.valid = event;
  }
  Todaydate = new Date()
  @ViewChild(BlockingdetailsComponent, { static: false })
  block: BlockingdetailsComponent;
  @ViewChild("Name1", { static: false }) name: ElementRef;
  constructor(private confirmationDialogService: ConfirmationDialogService,
    private datePipe: DatePipe,
    private _masterformservice: MasterformService,
    private router: Router,
    private http: HttpClient,
    private _reservationservice: ReservationService,
    private toastyService: ToastyService,
    private _oprservice: OperationService,
    private _ipservice: IpserviceService,
    private _hmsdashboard: HmsdashboardService,
    private _bankservice: BankService,
    private _OprService: OperationService
  ) {
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
    };

    // this.changepaxform = {
    //   RoomNo: "0",
    //   RoomCode: "0",
    //   GuestName: "0",
    //   Pax: 0,
    //   ActualRate: 0,
    //   OfferRate: 0,
    //   Tax: 0,
    //   NetAmount: 0,
    //   Reason: "Change Pax",
    //   Mode: "Change",
    //   Id: 0,
    //   BranchCode: this.Branch,
    //   IpAdd: "0",
    //   CreatedBy: this.UserId
    // };

    this._reservationservice.GetBookingList(this.Branch).subscribe(data => {
      this.BookingList = data;
    });
    this._hmsdashboard.GetHmsDashboard(this.Branch).subscribe(res => {
      this.finalMenu = res;
      this.vacantRoom = res["Rooms"].filter(a => a.Status == "V");
      this.DasboardLoad = setInterval(() => {
        this._hmsdashboard.GetHmsDashboard(this.Branch).subscribe(res => {
          this.finalMenu = res;
          this.vacantRoom = res["Rooms"].filter(a => a.Status == "V");
        });
      }, 7000);
    });
  }

  ngOnDestroy() {
    clearInterval(this.DasboardLoad);
  }

  LoadReservationCheckinpage(ResNo: string) {
    this.router.navigate(["/Master/reschk", ResNo]);
  }

  OpenMyModel(event, name) {
    document.querySelector("#" + event).classList.add("md-show");
  }

  openRoomsPopup(event, roomname) {
    this.model2 = {
      roomname: roomname
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
    console.log("Francis");
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
    alert("fdfdf");
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
      case "Management":
        break;
      case "Release":
        break;
      case "ReleaseB":
        break;

      case "Post":
        break;
      case "Advance":
        break;
      case "Shifft":
        this.ProcessRoomShift(RoomNo);
        break;
      case "Discount":
        this.ProcessDiscount(RoomNo);
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
        this.ProcessChangeCompany(RoomNo);
        break;
      case "HouseGuest":
        break;
      case "PaxonBill":
        this.ProcessPaxOnBill(RoomNo);
        break;
      case "linkunlink":
        this.ProcessLinkRoom(RoomNo, "LINK");
        break;
      case "linkunlink1":
        this.ProcessLinkRoom(RoomNo, "UNLINK");
        break;
      case "ChangePlan":
        this.ProcessChangePlan(RoomNo);
        break;
      case "Instruction":
        this.ProcessRoomInstruction(RoomNo);
        break;
        case "FoodCoupon":
          this.ProcessFoodcoupon(RoomNo);
          break;
    }
    console.log(event);
    console.log("event");
    document.querySelector("#" + event).classList.add("md-show");
  }

  ProcessLinkRoom(RoomNo: string, Des: string) {
    this.selectedRoomNoArray = [];
    this.linkroommodel = [];
    if (Des == "LINK") {
      this.golbalresponse = [];
      this._oprservice.GetLinkingRooms(this.Branch, this.RoomNos, "LINK").subscribe(res => {
        this.linkroommodel = res;
      })
    }
    else {
      this.golbalresponse = [];
      this._oprservice.GetLinkingRooms(this.Branch, this.RoomNos, "UNLINK").subscribe(res => {
        this.linkroommodel = res;
      })
    }
  }



  buttonlinlclick(event, RoomNos, RoomCodes, RoomNo) {
    debugger
    const classNameS = event.target.className;
    if (classNameS.indexOf('freeroom') >= 0) {
      document.querySelector("#" + RoomNos).classList.remove('freeroom');
      document.querySelector("#" + RoomNos).classList.add('occroom');
      this.addData(RoomNo);
    }
    else {
      document.querySelector("#" + RoomNos).classList.remove('occroom');
      document.querySelector("#" + RoomNos).classList.add('freeroom');
      this.deleteMsg(RoomNo);
    }

  }

  addData(msg: string) {
    this.selectedRoomNoArray.push(msg);
  }
  getData() {

    return this.selectedRoomNoArray;
  }
  deleteMsg(msg: string) {
    const index: number = this.selectedRoomNoArray.indexOf(msg);
    if (index !== -1) {
      this.selectedRoomNoArray.splice(index, 1);
    }
  }

  SaveLinkRoom(type: string) {
    this.confirmationDialogService.confirm('Please confirm ..', 'Do you really want to Change Guest ... ?')
      .then((confirmed) => {
        console.log('User confirmed:', confirmed)
        if (confirmed === true) {
          this.golbalresponse = this.getData();
          console.log('this.golbalresponse')
          console.log(this.golbalresponse)
          var sdata = JSON.stringify(this.golbalresponse);
          var leftstring = sdata.replace('[', '');
          var rightstr = leftstring.replace(']', '');
          console.log(rightstr);
          this._oprservice.UpdateLinkRoom(this.Branch, this.RoomNos, rightstr).subscribe(res => {
            if (res == true) {
              this.addToast(
                "Cogwave Software Technologies Pvt Ltd..",
                "Congratulations Data Saved Sucessfully",
                "success"
              );
            }
            else {
              this.addToast("Cogwave Software", "Sorry Data Not Saved Sucessfully ", "error");
            }
          },
            error => {
              console.log(error.message)
              console.log('error.message')
              this.addToast("Cogwave Software", error.message, "error");
            },
            () => {
              this.closeMyModalPin(event);
            });
        }
        else {
          return;
        }
      })
      .catch(() => {
        alert('cach')
        console.log('e.g., by using ESC, clicking the cross icon, or clicking outside the dialog')
      });


  }

  SaveUnLinkRoom(type: string) {

    this.confirmationDialogService.confirm('Please confirm ..', 'Do you really want to Change Guest ... ?')
      .then((confirmed) => {
        console.log('User confirmed:', confirmed)
        if (confirmed === true) {
          this.golbalresponse = this.getData();
          console.log('this.golbalresponse')
          console.log(this.golbalresponse)
          var sdata = JSON.stringify(this.golbalresponse);
          var leftstring = sdata.replace('[', '');
          var rightstr = leftstring.replace(']', '');
          console.log(rightstr);
          this._oprservice.UpdateUnlinkRoom(this.Branch, this.RoomNos, rightstr).subscribe(res => {
            if (res == true) {
              this.addToast(
                "Cogwave Software Technologies Pvt Ltd..",
                "Congratulations Data Saved Sucessfully",
                "success"
              );
            }
            else {
              this.addToast("Cogwave Software", "Sorry Data Not Saved Sucessfully ", "error");
            }
          },
            error => {
              console.log(error.message)
              console.log('error.message')
              this.addToast("Cogwave Software", error.message, "error");
            },
            () => {
              this.closeMyModalPin(event);
            });
        }
      }).catch(() => {
        console.log('e.g., by using ESC, clicking the cross icon, or clicking outside the dialog')
      });






  }


  ProcessExtraBed(RoomNo: string) {
    this._OprService.GetExtraBedFormData(this.Branch, RoomNo, 1).subscribe(
      res => {
        this.extrabedform = res;
        this.extrabedform.CreatedBy = this.UserId;
      },
      error => {
        console.log("error in ProcessExtraBed");
      },
      () => {
        console.log("Sucess in ProcessExtraBed");
      }
    );
  }

  ProcessPaxOnBill(RoomNo: string) {
    this.paxonbillform = {
      RoomNo: RoomNo,
      RoomCode: this.RoomCodes,
      Pax: 1,
      BranchCode: this.Branch,
      IpAdd: "0",
      CreatedBy: this.UserId
    };
    console.log("ProcessPaxOnBill");
    console.log(this.paxonbillform);
  }
  ProcessRoomInstruction(RoomNo: string) {
    this._oprservice.GetRoomInstructionData(this.Branch, RoomNo).subscribe(data => {
      this.roominstructionmodel = data;
    })
    this.RoomInstruction = {
      Id: "0",
      RoomNo: RoomNo,
      RoomCode: this.RoomCodes,
      ProcessDate: new Date(),
      special: "",
      BranchCode: this.Branch,
      CreatedBy: this.UserId
    };
    console.log("ProcessRoomInstruction");
    console.log(this.RoomInstruction);
  }

  ProcessDiscount(RoomNo: string) {
    this._OprService.GetDiscountFormData(this.Branch, RoomNo).subscribe(
      res => {
        this.discountform = res;
        this.discountform.CreatedBy = this.UserId;
        this.discountform.BranchCode = this.Branch;
        this.discountform.RoomCode = this.RoomCodes;
      },
      error => {
        console.log("error in discountform");
      },
      () => {
        console.log("Sucess in discountform");
      }
    );
  }

  ProcessChangeCompany(RoomNo: string) {
    this._OprService.GetChangeCompanyData(this.Branch, RoomNo).subscribe(
      res => {
        this.changecompanyform = res;
        this.changecompanyform.CreatedBy = this.UserId;
        this.changecompanyform.BranchCode = this.Branch;
        this.changecompanyform.RoomCode = this.RoomCodes;
      },
      error => {
        console.log("error in discountform");
      },
      () => {
        console.log("Sucess in discountform");
      }
    );
  }

  ProcessAmend(RoomNo: string) {

    let Checkintime, checkoutTime, checkindate, checkoutdate;
    this.Todaydate = new Date();
    this.Todaydate.setDate(this.Todaydate.getDate() + 1);
    this._OprService.GetAmendFormData(this.Branch, RoomNo).subscribe(
      res => {
        this.amendformdata = res;

        checkoutdate = new Date(res.CheckoutDate)
        this.amendformdata.CheckoutDate = checkoutdate;
        this.amendformdata.AmendDate = this.Todaydate;
        this.amendformdata.AmendTime = new Date();
        this.amendformdata.CreatedBy = this.UserId;
        this.amendformdata.BranchCode = this.Branch;
      },
      error => {
        console.log("error in ProcessAmend");
      },
      () => {
        console.log("Sucess in ProcessAmend");
      }
    );
  }

  ProcessChangePax(RoomNo: string) {
    this._OprService.GetPaxEditFormData(this.Branch, RoomNo).subscribe(
      res => {
        this.changepaxform = res;
        this.changepaxform.CreatedBy = this.UserId;
      },
      error => {
        console.log("error in ProcessChangePax");
      },
      () => {
        console.log("Sucess in ProcessChangePax");
      }
    );
  }

  ProcessRoomShift(RoomNo: string) {
    this._OprService.GetRoomShiftFormData(this.Branch, RoomNo).subscribe(
      res => {
        this.roomshifftformmodel = res;
        this.roomshifftformmodel.CreatedBy = this.UserId;
      },
      error => {
        console.log("error in ProcessRoomShift");
      },
      () => {
        console.log("Sucess in ProcessRoomShift");
      }
    );
  }

  ProcessChangePlan(RoomNo: string) {

    this._OprService.GetChangePlanFormData(this.Branch, RoomNo).subscribe(
      res => {
        this.changeplanformmodel = res;
        this.changeplanformmodel.CPlan = "0";
        this.changeplanformmodel.CreatedBy = this.UserId;
      },
      error => {
        console.log("error in ProcessChangePlan");
      },
      () => {
        console.log("Sucess in ProcessChangePlan");
      }
    );
  }

  ProcessFoodcoupon(RoomNo: string) {

    this._OprService.GetfoodcouponFormData(this.Branch, RoomNo).subscribe(
      res => {
        this.Foodcouponmodel = res;

        console.log(res)
        console.log('res')
        this.Foodcouponmodel.RoomCode =this.RoomCodes;
        this.Foodcouponmodel.ProcessDate=new Date();
        this.Foodcouponmodel.CreatedBy = this.UserId;
      },
      error => {
        console.log("error in ProcessFoodcoupon");
      },
      () => {
        console.log("Sucess in ProcessFoodcoupon");
      }
    );
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
    console.log(event);
    console.log("event");
    document.querySelector("#" + event).classList.add("md-show");
  }

  modalVacentHide(event) {
    var allbtn = document.querySelector(".md-show");
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
